import { world, system, ItemStack } from '@minecraft/server';
import { hasLoreInHeldItem, randomInt } from '../../../utils/utils.js';

const blockDropMap = {
  'minecraft:stone': 'minecraft:cobblestone',
  'minecraft:deepslate': 'minecraft:cobbled_deepslate',
  'minecraft:iron_ore': 'minecraft:raw_iron',
  'minecraft:deepslate_iron_ore': 'minecraft:raw_iron',
  'minecraft:gold_ore': 'minecraft:raw_gold',
  'minecraft:deepslate_gold_ore': 'minecraft:raw_gold',
  'minecraft:copper_ore': 'minecraft:raw_copper',
  'minecraft:deepslate_copper_ore': 'minecraft:raw_copper',
  'minecraft:coal_ore': 'minecraft:coal',
  'minecraft:deepslate_coal_ore': 'minecraft:coal',
  'minecraft:redstone_ore': 'minecraft:redstone',
  'minecraft:deepslate_redstone_ore': 'minecraft:redstone',
  'minecraft:lapis_ore': 'minecraft:lapis_lazuli',
  'minecraft:deepslate_lapis_ore': 'minecraft:lapis_lazuli',
  'minecraft:diamond_ore': 'minecraft:diamond',
  'minecraft:deepslate_diamond_ore': 'minecraft:diamond',
  'minecraft:emerald_ore': 'minecraft:emerald',
  'minecraft:deepslate_emerald_ore': 'minecraft:emerald',
  'minecraft:grass': 'minecraft:wheat_seeds',
  'minecraft:fern': 'minecraft:wheat_seeds',
  'minecraft:tall_grass': 'minecraft:wheat_seeds',
  'minecraft:large_fern': 'minecraft:wheat_seeds',
  'minecraft:vine': 'minecraft:string',
  'minecraft:lily_pad': 'minecraft:lily_pad',
  'minecraft:sugar_cane': 'minecraft:sugar_cane',
  'minecraft:cactus': 'minecraft:cactus',
  'minecraft:bamboo': 'minecraft:bamboo',
  'minecraft:kelp': 'minecraft:kelp',
  'minecraft:seagrass': 'minecraft:seagrass',
  'minecraft:sea_pickle': 'minecraft:sea_pickle',
  'minecraft:dead_bush': 'minecraft:stick',
  'minecraft:sweet_berry_bush': 'minecraft:sweet_berries',
  'minecraft:glow_lichen': 'minecraft:glow_lichen',
  'minecraft:dandelion': 'minecraft:dandelion',
  'minecraft:poppy': 'minecraft:poppy',
  'minecraft:blue_orchid': 'minecraft:blue_orchid',
  'minecraft:allium': 'minecraft:allium',
  'minecraft:azure_bluet': 'minecraft:azure_bluet',
  'minecraft:red_tulip': 'minecraft:red_tulip',
  'minecraft:orange_tulip': 'minecraft:orange_tulip',
  'minecraft:white_tulip': 'minecraft:white_tulip',
  'minecraft:pink_tulip': 'minecraft:pink_tulip',
  'minecraft:oxeye_daisy': 'minecraft:oxeye_daisy',
  'minecraft:cornflower': 'minecraft:cornflower',
  'minecraft:lily_of_the_valley': 'minecraft:lily_of_the_valley',
  'minecraft:sunflower': 'minecraft:sunflower',
  'minecraft:peony': 'minecraft:peony',
  'minecraft:rose_bush': 'minecraft:rose_bush',
  'minecraft:lilac': 'minecraft:lilac',
  'minecraft:oak_leaves': 'minecraft:stick',
  'minecraft:birch_leaves': 'minecraft:stick',
  'minecraft:spruce_leaves': 'minecraft:stick',
  'minecraft:jungle_leaves': 'minecraft:stick',
  'minecraft:acacia_leaves': 'minecraft:stick',
  'minecraft:dark_oak_leaves': 'minecraft:stick',
  'minecraft:mangrove_leaves': 'minecraft:stick',
  'minecraft:cherry_leaves': 'minecraft:stick',
  'minecraft:azalea_leaves': 'minecraft:stick',
  'minecraft:flowering_azalea_leaves': 'minecraft:stick',
  'minecraft:grass_block': 'minecraft:dirt',
  'minecraft:dirt_path': 'minecraft:dirt',
  'minecraft:short_grass': 'minecraft:wheat_seeds',
};

const unbreakableBlocks = new Set([
  'minecraft:bedrock',
  'minecraft:barrier',
  'minecraft:reinforced_deepslate',
  'minecraft:obsidian',
  'minecraft:crying_obsidian',
  'minecraft:end_portal',
  'minecraft:end_portal_frame',
  'minecraft:portal',
  'minecraft:structure_void',
  'minecraft:command_block',
  'minecraft:repeating_command_block',
  'minecraft:chain_command_block',
  'minecraft:structure_block',
  'minecraft:jigsaw',
  'minecraft:spawner',
  'minecraft:lodestone',
  'minecraft:netherite_block',
  'minecraft:ender_chest',
  'minecraft:border_block',
  'minecraft:water',
  'minecraft:lava'
]);

const silkTouchApplicable = new Set([
  'minecraft:stone',
  'minecraft:deepslate',
  'minecraft:grass_block',
  'minecraft:dirt_path',
  'minecraft:glass',
  'minecraft:glass_pane',
  'minecraft:ice',
  'minecraft:packed_ice',
  'minecraft:blue_ice',
  'minecraft:amethyst_cluster',
  'minecraft:small_amethyst_bud',
  'minecraft:medium_amethyst_bud',
  'minecraft:large_amethyst_bud',
  'minecraft:budding_amethyst',
  'minecraft:bookshelf',
  'minecraft:glowstone',
  'minecraft:bee_nest',
  'minecraft:oak_leaves',
  'minecraft:birch_leaves',
  'minecraft:spruce_leaves',
  'minecraft:jungle_leaves',
  'minecraft:acacia_leaves',
  'minecraft:dark_oak_leaves',
  'minecraft:mangrove_leaves',
  'minecraft:cherry_leaves',
  'minecraft:azalea_leaves',
  'minecraft:flowering_azalea_leaves',
  'ender_chest'
]);

const fortuneApplicable = new Set([
  'minecraft:coal_ore',
  'minecraft:deepslate_coal_ore',
  'minecraft:diamond_ore',
  'minecraft:deepslate_diamond_ore',
  'minecraft:emerald_ore',
  'minecraft:deepslate_emerald_ore',
  'minecraft:lapis_ore',
  'minecraft:deepslate_lapis_ore',
  'minecraft:redstone_ore',
  'minecraft:deepslate_redstone_ore',
  'minecraft:nether_quartz_ore',
  'minecraft:nether_gold_ore',
  'minecraft:copper_ore',
  'minecraft:deepslate_copper_ore'
]);

function hasSilkTouch(player) {
  const item = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex);
  if (!item) return false;

  const enchantable = item.getComponent("enchantable");
  if (!enchantable) return false;

  const enchantments = enchantable.getEnchantments();
  return enchantments.some(enchant => enchant.type.id === 'silk_touch');
}

function getFortuneLevel(player) {
  const item = player.getComponent("inventory")?.container?.getItem(player.selectedSlotIndex);
  if (!item) return 0;

  const enchantable = item.getComponent("enchantable");
  if (!enchantable) return 0;

  const enchantments = enchantable.getEnchantments();
  const enchant = enchantments.find(e => e.type.id === 'fortune');
  return enchant?.level ?? 0;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tryApplySeismic(player, origin) {
  if (!hasLoreInHeldItem(player, 'seismic') || player.isSneaking) return;

  const { x, y, z } = origin;
  const dim = player.dimension;
  const radius = 1;
  const silkTouch = hasSilkTouch(player);
  const fortuneLevel = getFortuneLevel(player);

  for (let dx = -radius; dx <= radius; dx++) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dz = -radius; dz <= radius; dz++) {
        const bx = x + dx;
        const by = y + dy;
        const bz = z + dz;

        if (dx === 0 && dy === 0 && dz === 0) continue;

        const block = dim.getBlock({ x: bx, y: by, z: bz });
        if (!block || block.typeId === 'minecraft:air' || unbreakableBlocks.has(block.typeId)) continue;

        const blockType = block.typeId;
        const dropType = (silkTouch && silkTouchApplicable.has(blockType)) ? blockType : (blockDropMap[blockType] || blockType);

        let dropCount = 1;
        if (!silkTouch && fortuneLevel > 0 && fortuneApplicable.has(blockType)) {
          dropCount = 1 + randomInt(0, fortuneLevel);
        }

        block.setType('minecraft:air');
        if (dropType !== 'minecraft:air') {
          dim.spawnItem(new ItemStack(dropType, dropCount), { x: bx + 0.5, y: by + 0.5, z: bz + 0.5 });
        }
      }
    }
  }
  player.onScreenDisplay.setActionBar('§r[§nSeismic§r]');
}


world.afterEvents.playerBreakBlock.subscribe(({ player, block }) => {
  if (player?.isValid() && block) {
    system.run(() => tryApplySeismic(player, block.location));
  }
});

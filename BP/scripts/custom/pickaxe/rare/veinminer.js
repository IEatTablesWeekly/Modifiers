import { world, system, ItemStack, ItemTypes } from '@minecraft/server';
import { hasLoreInHeldItem, randomInt, displayOnActionbar } from '../../../utils/utils.js';

function hasSilkTouch(player) {
  const item = player.getComponent('inventory')?.container?.getItem(player.selectedSlotIndex);
  const enchantable = item?.getComponent('enchantable');
  return enchantable?.getEnchantments()?.some(e => e.type.id === 'silk_touch') || false;
}

function getFortuneLevel(player) {
  const item = player.getComponent('inventory')?.container?.getItem(player.selectedSlotIndex);
  const enchantable = item?.getComponent('enchantable');
  const enchant = enchantable?.getEnchantments()?.find(e => e.type.id === 'fortune');
  return enchant?.level ?? 0;
}

const naturalOreDrops = {
  'minecraft:coal_ore': 'minecraft:coal',
  'minecraft:deepslate_coal_ore': 'minecraft:coal',
  'minecraft:diamond_ore': 'minecraft:diamond',
  'minecraft:deepslate_diamond_ore': 'minecraft:diamond',
  'minecraft:emerald_ore': 'minecraft:emerald',
  'minecraft:deepslate_emerald_ore': 'minecraft:emerald',
  'minecraft:lapis_ore': 'minecraft:lapis_lazuli',
  'minecraft:deepslate_lapis_ore': 'minecraft:lapis_lazuli',
  'minecraft:redstone_ore': 'minecraft:redstone',
  'minecraft:deepslate_redstone_ore': 'minecraft:redstone',
  'minecraft:copper_ore': 'minecraft:raw_copper',
  'minecraft:deepslate_copper_ore': 'minecraft:raw_copper',
  'minecraft:iron_ore': 'minecraft:raw_iron',
  'minecraft:deepslate_iron_ore': 'minecraft:raw_iron',
  'minecraft:gold_ore': 'minecraft:raw_gold',
  'minecraft:deepslate_gold_ore': 'minecraft:raw_gold',
  'minecraft:ancient_debris': 'minecraft:ancient_debris'
};

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
  'minecraft:copper_ore',
  'minecraft:deepslate_copper_ore'
]);

function breakOreBlock(block, player, silkTouch, fortuneLevel, blockTypeId) {
  const loc = block.location;
  const dim = block.dimension;

  system.runTimeout(() => {
    block.setType('minecraft:air');

    let dropCount = 1;
    if (!silkTouch && fortuneApplicable.has(blockTypeId) && fortuneLevel > 0) {
      dropCount += randomInt(0, fortuneLevel);
    }

    const dropId = silkTouch ? blockTypeId : (naturalOreDrops[blockTypeId] ?? blockTypeId);
    const dropItem = new ItemStack(ItemTypes.get(dropId), dropCount);
    dim.spawnItem(dropItem, { x: loc.x + 0.5, y: loc.y + 0.5, z: loc.z + 0.5 });
  }, 0);
}

function veinMine(originBlock, player, blockTypeId, visited = new Set()) {
  const radius = 1;
  const silkTouch = hasSilkTouch(player);
  const fortune = getFortuneLevel(player);

  const key = `${originBlock.location.x},${originBlock.location.y},${originBlock.location.z}`;
  if (visited.has(key)) return;
  visited.add(key);

  breakOreBlock(originBlock, player, silkTouch, fortune, blockTypeId);

  const { x, y, z } = originBlock.location;

  for (let dx = -radius; dx <= radius; dx++) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dz = -radius; dz <= radius; dz++) {
        if (dx === 0 && dy === 0 && dz === 0) continue;

        const neighborLoc = { x: x + dx, y: y + dy, z: z + dz };
        const neighbor = player.dimension.getBlock(neighborLoc);

        if (neighbor?.typeId === blockTypeId) {
          veinMine(neighbor, player, blockTypeId, visited);
        }
      }
    }
  }
}

world.afterEvents.playerBreakBlock.subscribe(({ player, block, brokenBlockPermutation }) => {
  if (!player?.isValid() || !block) return;
  if (player.isSneaking) return;
  if (!hasLoreInHeldItem(player, 'vein miner')) return;
  
  const blockTypeId = brokenBlockPermutation.type.id;
  if (!naturalOreDrops[blockTypeId]) return;
  system.run(() => veinMine(block, player, blockTypeId));
  displayOnActionbar(player, '§r[§sVein Miner§r]', 40, 1)
});

import { world, system, ItemStack, ItemTypes } from '@minecraft/server';
import { hasLoreInHeldItem, randomInt, displayOnActionbar } from '../../../utils/utils.js';

const smeltingOreMap = new Map([
  ['minecraft:copper_ore', 'minecraft:copper_ingot'],
  ['minecraft:deepslate_copper_ore', 'minecraft:copper_ingot'],
  ['minecraft:iron_ore', 'minecraft:iron_ingot'],
  ['minecraft:deepslate_iron_ore', 'minecraft:iron_ingot'],
  ['minecraft:gold_ore', 'minecraft:gold_ingot'],
  ['minecraft:deepslate_gold_ore', 'minecraft:gold_ingot'],
  ['minecraft:deepslate_coal_ore', 'minecraft:coal'],
  ['minecraft:ancient_debris', 'minecraft:netherite_scrap']
]);

const fortuneApplicable = new Set([
  'minecraft:iron_ore',
  'minecraft:deepslate_iron_ore',
  'minecraft:gold_ore',
  'minecraft:deepslate_gold_ore',
  'minecraft:copper_ore',
  'minecraft:deepslate_copper_ore',
]);

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

function tryApplyVolcanic(player, blockId, blockLoc) {
  if (!hasLoreInHeldItem(player, 'volcanic')) return;
  if (!smeltingOreMap.has(blockId)) return;

  const dim = player.dimension;
  const silkTouch = hasSilkTouch(player);
  if (silkTouch) return;
  const fortune = getFortuneLevel(player);

  const smeltedDrop = smeltingOreMap.get(blockId);
  const dropId = silkTouch ? blockId : smeltedDrop;

  let dropCount = 1;
  if (!silkTouch && fortuneApplicable.has(blockId) && fortune > 0) {
    dropCount += randomInt(0, fortune);
  }

  system.runTimeout(() => {
    for (const entity of dim.getEntities({
      type: 'item',
      location: blockLoc,
      maxDistance: 1.5
    })) {
      entity.kill();
    }

    const drop = new ItemStack(ItemTypes.get(dropId), dropCount);
    dim.spawnItem(drop, blockLoc);

    displayOnActionbar(player, '§r[§vVolcanic§r]', 40, 1)

  }, 1);
}

world.afterEvents.playerBreakBlock.subscribe(({ player, brokenBlockPermutation, block }) => {
  if (player?.isValid()) {
    tryApplyVolcanic(player, brokenBlockPermutation.type.id, block.location);
  }
});

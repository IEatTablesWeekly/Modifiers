import { world } from '@minecraft/server';
import { hasLoreInHeldItem, toAllPlayers } from '../../../utils/utils.js';

const oreItems = new Set([
  'minecraft:coal',
  'minecraft:coal_block',
  'minecraft:coal_ore',
  'minecraft:deepslate_coal_ore',
  'minecraft:raw_iron',
  'minecraft:iron_ingot',
  'minecraft:iron_block',
  'minecraft:iron_ore',
  'minecraft:deepslate_iron_ore',
  'minecraft:raw_iron_block',
  'minecraft:raw_gold',
  'minecraft:gold_ingot',
  'minecraft:gold_block',
  'minecraft:gold_ore',
  'minecraft:deepslate_gold_ore',
  'minecraft:raw_gold_block',
  'minecraft:gold_nugget',
  'minecraft:raw_copper',
  'minecraft:copper_ingot',
  'minecraft:raw_copper_block',
  'minecraft:copper_block',
  'minecraft:copper_ore',
  'minecraft:deepslate_copper_ore',
  'minecraft:lapis_lazuli',
  'minecraft:lapis_block',
  'minecraft:lapis_ore',
  'minecraft:deepslate_lapis_ore',
  'minecraft:quartz',
  'minecraft:nether_quartz_ore',
  'minecraft:quartz_block',
  'minecraft:redstone',
  'minecraft:redstone_block',
  'minecraft:redstone_ore',
  'minecraft:deepslate_redstone_ore',
  'minecraft:emerald',
  'minecraft:emerald_block',
  'minecraft:emerald_ore',
  'minecraft:deepslate_emerald_ore',
  'minecraft:diamond',
  'minecraft:diamond_block',
  'minecraft:diamond_ore',
  'minecraft:deepslate_diamond_ore',
  'minecraft:netherite_scrap',
  'minecraft:netherite_ingot',
  'minecraft:netherite_block',
  'minecraft:ancient_debris'
]);


function tryApplyMagnetized(player) {
  if (!hasLoreInHeldItem(player, 'magnetized')) return;

  const dim = player.dimension;
  const playerLoc = player.location;

  const items = dim.getEntities({
    type: 'item',
    location: playerLoc,
    maxDistance: 6
  });

  for (const entity of items) {
    const itemStack = entity.getComponent('item')?.itemStack;
    if (!itemStack || !oreItems.has(itemStack.typeId)) continue;

    const itemLoc = entity.location;
    const dx = playerLoc.x - itemLoc.x;
    const dy = (playerLoc.y + 1.2) - itemLoc.y;
    const dz = playerLoc.z - itemLoc.z;

    const magnitude = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (magnitude === 0) continue;

    const impulseStrength = 0.5;
    entity.applyImpulse({
      x: (dx / magnitude) * impulseStrength,
      y: (dy / magnitude) * impulseStrength,
      z: (dz / magnitude) * impulseStrength
    });
  }
}

toAllPlayers(tryApplyMagnetized, 10);

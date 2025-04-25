import { world, system, ItemStack } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

const oreBlocks = new Set([
  'minecraft:coal_ore',
  'minecraft:copper_ore',
  'minecraft:diamond_ore',
  'minecraft:emerald_ore',
  'minecraft:gold_ore',
  'minecraft:iron_ore',
  'minecraft:lapis_ore',
  'minecraft:nether_gold_ore',
  'minecraft:nether_quartz_ore',
  'minecraft:deepslate_coal_ore',
  'minecraft:deepslate_copper_ore',
  'minecraft:deepslate_diamond_ore',
  'minecraft:deepslate_emerald_ore',
  'minecraft:deepslate_gold_ore',
  'minecraft:deepslate_iron_ore',
  'minecraft:deepslate_lapis_ore',
  'minecraft:ancient_debris'
]);

const oreDropMap = {
  'minecraft:coal_ore': 'minecraft:coal',
  'minecraft:deepslate_coal_ore': 'minecraft:coal',
  'minecraft:copper_ore': 'minecraft:raw_copper',
  'minecraft:deepslate_copper_ore': 'minecraft:raw_copper',
  'minecraft:emerald_ore': 'minecraft:emerald',
  'minecraft:deepslate_emerald_ore': 'minecraft:emerald',
  'minecraft:gold_ore': 'minecraft:raw_gold',
  'minecraft:deepslate_gold_ore': 'minecraft:raw_gold',
  'minecraft:iron_ore': 'minecraft:raw_iron',
  'minecraft:deepslate_iron_ore': 'minecraft:raw_iron',
  'minecraft:lapis_ore': 'minecraft:lapis_lazuli',
  'minecraft:deepslate_lapis_ore': 'minecraft:lapis_lazuli',
  'minecraft:nether_gold_ore': 'minecraft:gold_nugget',
  'minecraft:nether_quartz_ore': 'minecraft:quartz'
};

world.afterEvents.playerBreakBlock.subscribe(({ player, brokenBlockPermutation, block }) => {
  const blockId = brokenBlockPermutation.type.id;
  const blockPos = block.location;
  if (Math.random() > 0.1) return;

  if (!oreBlocks.has(blockId)) return;
  if (!hasLoreInHeldItem(player, 'prospector')) return;
  if (blockId.includes('diamond') || blockId === 'minecraft:ancient_debris') return;

  const dropItemId = oreDropMap[blockId];
  if (!dropItemId) return;

  system.runTimeout(() => {
    const itemStack = new ItemStack(dropItemId, 1);
    block.dimension.spawnItem(itemStack, blockPos);

    player.playSound('random.orb');
    displayOnActionbar(player, '§r[§gProspector§r]', 40, 1)
  }, 1);
});

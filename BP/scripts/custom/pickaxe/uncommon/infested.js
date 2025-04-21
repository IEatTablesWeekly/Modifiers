import { world, system } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

const trapBlocks = new Set([
  'minecraft:stone',
  'minecraft:granite',
  'minecraft:diorite',
  'minecraft:andesite',
  'minecraft:deepslate'
]);

world.afterEvents.playerBreakBlock.subscribe(({ player, brokenBlockPermutation }) => {
  const blockId = brokenBlockPermutation.type.id;
  if (Math.random() > 0.05) return;
  if (!trapBlocks.has(blockId)) return;
  if (!hasLoreInHeldItem(player, 'infested')) return;

  system.runTimeout(() => {
    const pos = player.location;
    const dim = player.dimension;

    dim.spawnEntity('minecraft:silverfish', {
      x: pos.x,
      y: pos.y,
      z: pos.z
    });

    player.playSound('mob.silverfish.say');
    player.onScreenDisplay.setActionBar('§r[§qInfested§r]');
  }, 5);
});

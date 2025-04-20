import { hasLoreInHeldItem , toAllPlayers } from '../../../utils/utils.js';
import { world , TicksPerSecond } from '@minecraft/server'

function tryApplyGlassEdgeBuff(player) {
    if (!hasLoreInHeldItem(player, 'glass edge')) return;
    player.addEffect("haste", TicksPerSecond * 2, { amplifier: 3, showParticles: false });
}

function tryApplyGlassEdgeDebuff(player) {
    if (!hasLoreInHeldItem(player, 'glass edge')) return;

    const inventory = player.getComponent('minecraft:inventory')?.container;
    if (!inventory) return;

    const selectedSlot = player.selectedSlotIndex;

    const item = inventory.getItem(selectedSlot);
    const durability = item?.getComponent('minecraft:durability');

    if (durability && durability.damage > 0) {
      const maxDurability = durability.maxDurability;
      const damageAmount = Math.ceil(maxDurability * 0.01);
      durability.damage = Math.min(durability.damage + damageAmount, maxDurability);
      inventory.setItem(selectedSlot, item);
      player.playSound('random.break');
      player.onScreenDisplay.setActionBar('§r[§pGlass Edge§r]');
  }
  
}

world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
    if (player?.isValid()) {
        tryApplyGlassEdgeDebuff(player);
    }
});

toAllPlayers(tryApplyGlassEdgeBuff,10);

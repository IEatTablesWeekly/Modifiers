import { world } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

function tryApplyCracked(player) {
    if (Math.random() > 0.2) return;

    if (!hasLoreInHeldItem(player, 'worn')) return;

    const inventory = player.getComponent('minecraft:inventory')?.container;
    if (!inventory) return;

    const selectedSlot = player.selectedSlotIndex;
    if (typeof selectedSlot !== 'number') return;

    const item = inventory.getItem(selectedSlot);
    const durability = item?.getComponent('minecraft:durability');

    if (durability && durability.damage < durability.maxDurability) {
        const maxDurability = durability.maxDurability;
        const damageIncrease = Math.ceil(maxDurability * 0.02);
        durability.damage = Math.min(durability.damage + damageIncrease, maxDurability);

        inventory.setItem(selectedSlot, item);

        player.playSound('random.break');
        player.onScreenDisplay.setActionBar('§r[§nItem Cracked§r]');
    }
}

world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
    if (player?.isValid()) {
        tryApplyCracked(player);
    }
});

world.afterEvents.entityHurt.subscribe(({ damageSource }) => {
    const attacker = damageSource.damagingEntity;
    if (attacker?.isValid() && attacker.typeId === 'minecraft:player') {
        tryApplyCracked(attacker);
    }
});

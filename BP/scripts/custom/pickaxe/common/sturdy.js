import { world } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

function tryApplySturdy(player) {
    if (Math.random() > 0.2) return;

    if (!hasLoreInHeldItem(player, 'sturdy')) return;

    const inventory = player.getComponent('minecraft:inventory')?.container;
    if (!inventory) return;

    const selectedSlot = player.selectedSlotIndex;

    const item = inventory.getItem(selectedSlot);
    const durability = item?.getComponent('minecraft:durability');

    if (durability && durability.damage > 0) {
        const maxDurability = durability.maxDurability;
        const restoreAmount = Math.ceil(maxDurability * 0.01);
        durability.damage = Math.max(durability.damage - restoreAmount, 0);

        inventory.setItem(selectedSlot, item);

        player.playSound('random.orb');
        player.onScreenDisplay.setActionBar('§r[§bSturdy§r]');
    }
}

world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
    if (player?.isValid()) {
        tryApplySturdy(player);
    }
});

world.afterEvents.entityHurt.subscribe(({ damageSource }) => {
    const attacker = damageSource.damagingEntity;
    if (attacker?.isValid() && attacker.typeId === 'minecraft:player') {
        tryApplySturdy(attacker);
    }
});

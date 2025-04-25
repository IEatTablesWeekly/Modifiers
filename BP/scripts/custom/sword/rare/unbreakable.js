import { world } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyUnbreakable(player) {
    if (!hasLoreInHeldItem(player, 'unbreakable')) return;

    const inventory = player.getComponent('minecraft:inventory')?.container;
    if (!inventory) return;

    const selectedSlot = player.selectedSlotIndex;

    const item = inventory.getItem(selectedSlot);
    const durability = item?.getComponent('minecraft:durability');

    if (durability && durability.damage > 0) {
        const maxDurability = durability.maxDurability;
        const restoreAmount = Math.ceil(maxDurability);
        durability.damage = Math.max(durability.damage - restoreAmount, 0);
        displayOnActionbar(player, '§r[§9Unbreakable§r]', 40, 0)

        inventory.setItem(selectedSlot, item);
    }
}

world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
    if (player?.isValid()) {
        tryApplyUnbreakable(player);
    }
});

world.afterEvents.entityHurt.subscribe(({ damageSource }) => {
    const attacker = damageSource.damagingEntity;
    if (attacker?.isValid() && attacker.typeId === 'minecraft:player') {
        tryApplyUnbreakable(attacker);
    }
});

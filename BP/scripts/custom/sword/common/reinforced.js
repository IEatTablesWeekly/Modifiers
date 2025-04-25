import { world } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyReinforcement(player) {
    if (Math.random() > 0.1) return;

    if (!hasLoreInHeldItem(player, 'reinforced')) return;

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
        displayOnActionbar(player, '§r[§bReinforced Item§r]', 40, 0)
    }
}

world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
    if (player?.isValid()) {
        tryApplyReinforcement(player);
    }
});

world.afterEvents.entityHurt.subscribe(({ damageSource }) => {
    const attacker = damageSource.damagingEntity;
    if (attacker?.isValid() && attacker.typeId === 'minecraft:player') {
        tryApplyReinforcement(attacker);
    }
});

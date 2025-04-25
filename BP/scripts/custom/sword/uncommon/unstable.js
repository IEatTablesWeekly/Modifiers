import { world } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';
function tryApplyUnstable(player) {
    if (!hasLoreInHeldItem(player, "unstable")) return;

    if (Math.random() < 0.01) {
        const inventory = player.getComponent('minecraft:inventory')?.container;
        if (!inventory) return;

        player.playSound('random.break');
        displayOnActionbar(player, '§r[§8Unstable§r]', 40, 0);
        inventory.setItem(player.selectedSlotIndex, null);
    }
}

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;
    const attacker = event.damageSource.damagingEntity;
    if (attacker?.isValid()) {
        tryApplyUnstable(attacker);
    }
});
world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
    if (player?.isValid()) {
        tryApplyUnstable(player);
    }
});

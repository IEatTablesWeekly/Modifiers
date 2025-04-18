import { world } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

function applyCursedHandleEffect(player) {
    if (!hasLoreInHeldItem(player, 'cursed handle')) return;
    if (Math.random() < 0.01) {
        const health = player.getComponent('minecraft:health');
        health.setCurrentValue(3);
        player.onScreenDisplay.setActionBar('§r[§uCursed Handle§r]');
        const dimension = world.getDimension(player.dimension.id);
        const { x, y, z } = player.location;
        const offsets = [
            [0, 1.5, 0], [1, 0.5, 0], [-1, 0.5, 0],
            [0, 0.5, 1], [0, 0.5, -1],
            [0.7, 1, 0.7], [-0.7, 1, -0.7],
            [0.7, 1, -0.7], [-0.7, 1, 0.7]
        ];
        for (const [dx, dy, dz] of offsets) {
            dimension.runCommandAsync(`particle minecraft:basic_flame_particle ${x + dx} ${y + dy} ${z + dz}`);
        }
    }
}

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;
    const player = event.damageSource.damagingEntity;
    if (!player) return;
    applyCursedHandleEffect(player);
});

world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
    if (player?.isValid()) {
        applyCursedHandleEffect(player);
    }
});


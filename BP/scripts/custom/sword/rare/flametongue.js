import { world , system } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker || !attacker.isValid()) return;

    if (!hasLoreInHeldItem(attacker, 'flametongue')) return;

    if (Math.random() < 0.05) {
        attacker.playSound('bucket.lava_fill');
        attacker.onScreenDisplay.setActionBar('§r[§vFlametongue§r]');

        const dimension = world.getDimension(damagedEntity.dimension.id);
        const { x, y, z } = damagedEntity.location;
        const lavaX = Math.floor(x);
        const lavaY = Math.floor(y + 1);
        const lavaZ = Math.floor(z);

        dimension.runCommandAsync(`setblock ${lavaX} ${lavaY} ${lavaZ} lava`);

        dimension.runCommandAsync(`setblock ${lavaX} ${lavaY-1} ${lavaZ} lava`);
        system.runTimeout(() => {
            dimension.runCommandAsync(`setblock ${lavaX} ${lavaY} ${lavaZ} air`);
            dimension.runCommandAsync(`setblock ${lavaX} ${lavaY-1} ${lavaZ} air`);
        }, 100);

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
});

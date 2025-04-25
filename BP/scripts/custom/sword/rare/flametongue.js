import { world , system, TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker || !attacker.isValid()) return;

    if (!hasLoreInHeldItem(attacker, 'flametongue')) return;

    if (Math.random() < 0.05) {
        attacker.playSound('bucket.lava_fill');
        displayOnActionbar(player, '§r[§vFlametongue§r]', 40, 0)

        attacker.addEffect("fire_resistance", TicksPerSecond * 15, {
            amplifier: 0,
            showParticles: false
        });

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
        }, TicksPerSecond * 5);

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

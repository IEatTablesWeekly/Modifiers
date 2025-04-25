import { world, system } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker || !attacker.isValid()) return;

    if (!hasLoreInHeldItem(attacker, 'silkbind')) return;

    if (Math.random() < 0.1) {
        displayOnActionbar(player, '§r[§rSilkbind§r]', 40, 0)

        const dimension = world.getDimension(damagedEntity.dimension.id);
        const { x, y, z } = damagedEntity.location;
        const baseX = Math.floor(x);
        const baseY = Math.floor(y + 1);
        const baseZ = Math.floor(z);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dz = -1; dz <= 1; dz++) {
                const wx = baseX + dx;
                const wy = baseY;
                const wz = baseZ + dz;
                dimension.runCommandAsync(`setblock ${wx} ${wy} ${wz} web`);
                system.runTimeout(() => {
                    dimension.runCommandAsync(`setblock ${wx} ${wy} ${wz} air`);
                }, 100);
            }
        }
        const offsets = [
            [0, 1.5, 0], [1, 0.5, 0], [-1, 0.5, 0],
            [0, 0.5, 1], [0, 0.5, -1],
            [0.7, 1, 0.7], [-0.7, 1, -0.7],
            [0.7, 1, -0.7], [-0.7, 1, 0.7]
        ];
        
        for (const [dx, dy, dz] of offsets) {
            dimension.runCommandAsync(`particle minecraft:basic_smoke_particle ${x + dx} ${y + dy} ${z + dz}`);
        }
        attacker.playSound('step.web');
    }
});

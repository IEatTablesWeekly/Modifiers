import { world, system, TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker || !attacker.isValid()) return;
    if (!hasLoreInHeldItem(attacker, 'timepiercer')) return;

    attacker.onScreenDisplay.setActionBar('§r[§2Timepiercer§r]');

    const { x: hx, y: hy, z: hz } = damagedEntity.location;
    const { x: yaw, y: pitch } = damagedEntity.getRotation();

    if (damagedEntity.typeId === 'minecraft:player') {
        damagedEntity.inputPermissions.setPermission("movement", false);
        damagedEntity.inputPermissions.setPermission("camera", false);
        damagedEntity.onScreenDisplay.setActionBar('§r[§2You have been Timepierced§r]');
    }

    let ticks = 0;
    const freezeId = system.runInterval(() => {
        if (!damagedEntity.isValid()) {
            system.clearRun(freezeId);
            return;
        }

        damagedEntity.teleport(
            { x: hx, y: hy, z: hz },
            { rotation: { x: yaw, y: pitch } }
        );

        damagedEntity.addEffect('weakness', TicksPerSecond * 5, { amplifier: 255 });
        damagedEntity.addEffect('slowness', TicksPerSecond * 5, { amplifier: 255 });
        damagedEntity.addEffect('mining_fatigue', TicksPerSecond * 5, { amplifier: 255 });
        damagedEntity.addEffect('darkness', TicksPerSecond * 5, { amplifier: 255 });

        const dimension = world.getDimension(damagedEntity.dimension.id);
        const { x, y, z } = damagedEntity.location;
        const offsets = [
            [0, 1.5, 0], [1, 0.5, 0], [-1, 0.5, 0],
            [0, 0.5, 1], [0, 0.5, -1],
            [0.7, 1, 0.7], [-0.7, 1, -0.7],
            [0.7, 1, -0.7], [-0.7, 1, 0.7]
        ];
        for (const [dx, dy, dz] of offsets) {
            dimension.runCommandAsync(`particle minecraft:totem_manual ${x + dx} ${y + dy} ${z + dz}`);
        }

        ticks++;
        if (ticks >= 100) {
            system.clearRun(freezeId);

            if (damagedEntity.isValid() && damagedEntity.typeId === 'minecraft:player') {
                damagedEntity.inputPermissions.setPermission("movement", true);
                damagedEntity.inputPermissions.setPermission("camera", true);
            }
        }
    }, 1);
});

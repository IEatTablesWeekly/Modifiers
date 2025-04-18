import { world } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker || !attacker.isValid()) return;

    if (!hasLoreInHeldItem(attacker, 'lifedrain')) return;

    if (Math.random() < 0.25) {
        const attackerHealth = attacker.getComponent('minecraft:health');
        const victimHealth = damagedEntity.getComponent('minecraft:health');

        attackerHealth.setCurrentValue(Math.min(20, attackerHealth.currentValue + 2));
        victimHealth.setCurrentValue(Math.max(0, victimHealth.currentValue - 2));

        attacker.playSound('mob.chicken.plop');
        attacker.onScreenDisplay.setActionBar('§r[§4Lifedrain§r]');

        const dimension = world.getDimension(damagedEntity.dimension.id);
        const { x, y, z } = damagedEntity.location;
        const offsets = [
            [0, 1.5, 0], [1, 0.5, 0], [-1, 0.5, 0],
            [0, 0.5, 1], [0, 0.5, -1],
            [0.7, 1, 0.7], [-0.7, 1, -0.7],
            [0.7, 1, -0.7], [-0.7, 1, 0.7]
        ];
        for (const [dx, dy, dz] of offsets) {
            dimension.runCommandAsync(`particle minecraft:heart_particle ${x + dx} ${y + dy} ${z + dz}`);
        }
    }
});

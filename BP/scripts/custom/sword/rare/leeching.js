import { world } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker || !attacker.isValid()) return;

    if (!hasLoreInHeldItem(attacker, 'leeching')) return;

    if (Math.random() < 0.25) {
        const attackerHealth = attacker.getComponent('minecraft:health');

        attackerHealth.setCurrentValue(Math.min(20, attackerHealth.currentValue + 2));
        displayOnActionbar(player, '§r[§cLeeching§r]', 40, 0)
        
        const dimension = world.getDimension(attacker.dimension.id);
        const { x, y, z } = attacker.location;
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

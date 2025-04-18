import { world } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const attacker = event.damageSource.damagingEntity;
    if (!attacker) return;

    if (!hasLoreInHeldItem(attacker, 'backlash')) return;
    
    if (Math.random() < 0.2) {
        const viewDirection = attacker.getViewDirection();
        attacker.applyKnockback(-viewDirection.x, -viewDirection.z, 1.5, 0.5);
        attacker.onScreenDisplay.setActionBar('§r[§pBacklash§r]');
    }
});
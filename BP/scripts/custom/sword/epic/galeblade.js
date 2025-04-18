import { world } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker) return;

    if (!hasLoreInHeldItem(attacker, 'galeblade')) return;
    
    if (Math.random() < 0.2) {
        const viewDirection = attacker.getViewDirection();
        damagedEntity.applyKnockback(viewDirection.x, viewDirection.z, 0, 2);
        attacker.onScreenDisplay.setActionBar('§r[§qGaleblade§r]');
    }
});
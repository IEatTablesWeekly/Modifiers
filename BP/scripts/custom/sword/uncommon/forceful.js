import { world } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker) return;

    if (!hasLoreInHeldItem(attacker, 'forceful')) return;
    
    const viewDirection = attacker.getViewDirection();
    damagedEntity.applyKnockback(viewDirection.x, viewDirection.z, 1, 0.5);
    displayOnActionbar(attacker, '§r[§7Forceful§r]', 40, 0)
});
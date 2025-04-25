import { world } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker || !attacker.isValid()) return;

    if (!hasLoreInHeldItem(attacker, 'windcutter')) return;
    
    const viewDirection = attacker.getViewDirection();
    damagedEntity.applyKnockback(viewDirection.x, viewDirection.z, 12, 2);
    displayOnActionbar(attacker, '§r[§aWindcutter§r]', 40, 0)
});

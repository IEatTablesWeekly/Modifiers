import { world } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {

    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;
    const damage = event.damage;
    if (damage <= 2) return;
    if (!attacker) return;

    if (!hasLoreInHeldItem(attacker, 'dull')) return;

    const health = damagedEntity.getComponent('minecraft:health');

    if (!health) return;
    
    health.setCurrentValue(Math.max(0, health.currentValue + 1));
});

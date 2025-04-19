import { world, system, Player, TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;
    const damage = event.damage;

    if (!attacker || !(attacker instanceof Player)) return;
    if (!hasLoreInHeldItem(attacker, 'ghostedge')) return;

    system.runTimeout(() => {
        damagedEntity.applyDamage(damage * 1.25, {cause:"entityAttack", damagingEntity: attacker});
    }, TicksPerSecond * 0.5);
});

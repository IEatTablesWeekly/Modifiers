import { world, system, Player } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;
    const damage = event.damage;
    if (!hasLoreInHeldItem(attacker, 'ghostedge')) return;

    if (!attacker || !(attacker instanceof Player)) return;

    system.runTimeout(() => {
        damagedEntity.applyDamage(damage * 1.25);
    }, 10);

    displayOnActionbar(attacker, '§r[§aGhostedge§r]', 40, 0)
});

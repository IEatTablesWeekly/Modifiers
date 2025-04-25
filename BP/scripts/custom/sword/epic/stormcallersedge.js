import { world, system, TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker || !attacker.isValid()) return;

    if (!hasLoreInHeldItem(attacker, "stormcaller's edge")) return;

    if (Math.random() < 0.5) {
        attacker.addEffect("fire_resistance", TicksPerSecond * 5, { amplifier: 0, showParticles: false });        
        displayOnActionbar(attacker, "§r[§tStormcaller's Edge§r]", 40, 0)
        damagedEntity.runCommandAsync('summon minecraft:lightning_bolt')

        system.runTimeout(() => {
            damagedEntity.applyDamage(15, {cause:"lightning", damagedEntity: attacker});
        }, 10);
    }
});

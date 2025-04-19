import { world, system, TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker || !attacker.isValid()) return;

    if (!hasLoreInHeldItem(attacker, "stormcaller's edge")) return;

    if (Math.random() < 0.5) {
        player.addEffect("fire_resistance", TicksPerSecond * 5, { amplifier: 0, showParticles: false });        
        attacker.onScreenDisplay.setActionBar("§r[§tStormcaller's Edge§r]");
        damagedEntity.runCommandAsync('summon minecraft:lightning_bolt')

        system.runTimeout(() => {
            damagedEntity.applyDamage(15, {cause:"lightning", damagedEntity: attacker});
        }, 10);
    }
});

import { world } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker) return;

    if (!hasLoreInHeldItem(attacker, 'feeble')) return;

    const health = damagedEntity.getComponent('minecraft:health');
    if (!health) return;
    
    if (Math.random() < 0.10) {
        health.setCurrentValue(Math.max(0, health.currentValue + 3));
        attacker.playSound('random.break');
        attacker.onScreenDisplay.setActionBar('§r[§pFeeble Hit§r]');
    }
});

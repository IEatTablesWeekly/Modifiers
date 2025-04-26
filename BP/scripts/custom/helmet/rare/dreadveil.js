import { world, EquipmentSlot, TicksPerSecond } from '@minecraft/server';
import { hasLoreInEquippedItem, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyDreadveil(player, attacker) {
    if (!hasLoreInEquippedItem(player, 'dreadveil', EquipmentSlot.Head)) return;
    if (attacker && Math.random() < 0.25) {
        attacker.addEffect("blindness", TicksPerSecond * 3, { amplifier: 0, showParticles: false });
        displayOnActionbar(player, '§r[§5Dreadveil§r]', 40, 5);
        displayOnActionbar(attacker, '§r[§5Caught in Dreadveil§r]', 40, 22);

    }

}

world.afterEvents.entityHurt.subscribe(({ hurtEntity, damageSource }) => {
    if (hurtEntity?.isValid() && hurtEntity.typeId === 'minecraft:player') {
        const attacker = damageSource?.damagingEntity;
        tryApplyDreadveil(hurtEntity, attacker);
    }
});

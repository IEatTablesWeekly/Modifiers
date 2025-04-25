import { world, system, TicksPerSecond, EquipmentSlot } from '@minecraft/server';
import { hasLoreInEquippedItem, displayOnActionbar } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;
    const damage = event.damage;

    if (!hasLoreInEquippedItem(damagedEntity, 'aegis', EquipmentSlot.Head)) return;
    
    system.runTimeout(() => {
        if (!damagedEntity || !damagedEntity.isValid()) return;
        damagedEntity.playSound('bubble.pop');
        damagedEntity.addEffect('absorption', TicksPerSecond * 5, { amplifier: 0 });
        displayOnActionbar(damagedEntity, '§r[§qAegis§r]', 40, 5)
    }, TicksPerSecond * 2.5);
    

    if (attacker && attacker.isValid()) {
        attacker.applyDamage(1, {cause:"thorns", damagedEntity: damagedEntity});
        const currentValue = attacker.getComponent('minecraft:health').currentValue;
        attacker.getComponent('minecraft:health').setCurrentValue(currentValue - damage * 0.5);
    }

    const dimension = world.getDimension(damagedEntity.dimension.id);
    const { x, y, z } = damagedEntity.location;
    const offsets = [
        [0, 1.5, 0], [1, 0.5, 0], [-1, 0.5, 0],
        [0, 0.5, 1], [0, 0.5, -1],
        [0.7, 1, 0.7], [-0.7, 1, -0.7],
        [0.7, 1, -0.7], [-0.7, 1, 0.7]
    ];
    for (const [dx, dy, dz] of offsets) {
        if (Math.random() < 0.25) {
            dimension.runCommandAsync(`particle minecraft:totem_particle ${x + dx} ${y + dy} ${z + dz}`);
        }
    }
});

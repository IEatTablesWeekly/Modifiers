import { world, system, TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;
    const damage = event.damage;

    if (!hasLoreInHeldItem(damagedEntity, 'aegis')) return;

    const amplifierSource = attacker?.getComponent('minecraft:health')?.currentValue ?? 8;
    const amplifier = Math.floor(amplifierSource / 10);
    const cappedAmplifier = Math.min(amplifier, 2);
    
    system.runTimeout(() => {
        if (!damagedEntity || !damagedEntity.isValid()) return;
        damagedEntity.playSound('bubble.pop');
        damagedEntity.addEffect('absorption', TicksPerSecond * 3, { amplifier });
        damagedEntity.addEffect('regeneration', TicksPerSecond * 3, { amplifier: cappedAmplifier });
    }, TicksPerSecond);
    

    if (attacker && attacker.isValid()) {
        attacker.applyDamage(1);
        const currentValue = attacker.getComponent('minecraft:health').currentValue;
        attacker.getComponent('minecraft:health').setCurrentValue(currentValue - damage * 0.5);
    }

    damagedEntity.onScreenDisplay.setActionBar('§r[§qAegis§r]');

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

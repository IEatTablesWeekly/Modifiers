import { EquipmentSlot, TicksPerSecond } from '@minecraft/server';
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyPropellerHat(player) {
    if (!hasLoreInEquippedItem(player, 'propeller hat', EquipmentSlot.Head)) return;

    if (!player.isSneaking) return;

    const viewDirection = player.getViewDirection();
    if (-viewDirection.y < 0.80) return;

    player.addEffect("levitation", TicksPerSecond, { amplifier: 4, showParticles: false });
    player.addEffect("slow_falling", TicksPerSecond * 6, { amplifier: 4, showParticles: false });

    player.playSound("elytra.loop");
    displayOnActionbar(player, `§r[§rPropeller Hat]`, 40, 5);
}

toAllPlayers(tryApplyPropellerHat, 10);

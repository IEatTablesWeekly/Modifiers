import { EquipmentSlot, TicksPerSecond } from '@minecraft/server';
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyFocus(player) {
    if (!hasLoreInEquippedItem(player, 'focus', EquipmentSlot.Head)) return;

    const velocity = player.getVelocity();
    if (!velocity) return;

    const isStationary = Math.abs(velocity.x) < 0.01 && Math.abs(velocity.y) < 0.01 && Math.abs(velocity.z) < 0.01;
    if (!isStationary) return;

    player.addEffect("resistance", TicksPerSecond, { amplifier: 1, showParticles: false });
    displayOnActionbar(player, '§r[§7Focused§r]', 40, 5);
}

toAllPlayers(tryApplyFocus, 10);

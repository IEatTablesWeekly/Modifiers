import { EquipmentSlot } from '@minecraft/server';
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';
import { TicksPerSecond } from '@minecraft/server'

function tryApplyFoggyMind(player) {
    if (!hasLoreInEquippedItem(player, 'foggy mind', EquipmentSlot.Head)) return;

    player.addEffect("nausea", TicksPerSecond * 4, { amplifier: 0, showParticles: false });
    displayOnActionbar(player, '§r[§7Foggy Mind§r]', 40, 5)
}

toAllPlayers(tryApplyFoggyMind, TicksPerSecond)

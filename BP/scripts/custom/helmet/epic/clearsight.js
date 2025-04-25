import { EquipmentSlot } from '@minecraft/server';
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';
import { TicksPerSecond } from '@minecraft/server'

function tryApplyClearSight(player) {
    if (!hasLoreInEquippedItem(player, 'clear sight', EquipmentSlot.Head)) return;

    player.addEffect("night_vision", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
    displayOnActionbar(player, '§r[§9Clear Sight§r]', 40, 5)
}

toAllPlayers(tryApplyClearSight, 10)

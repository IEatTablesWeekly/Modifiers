import { hasLoreInHeldItem , toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';
import { TicksPerSecond } from '@minecraft/server';

function tryApplyNausea(player) {
    if (!hasLoreInHeldItem(player, 'cacophony of collapse')) return;
    player.addEffect("nausea", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
    displayOnActionbar(player, '§r[§8Cacophony of Collapse§r]', 40, 0)
}

toAllPlayers(tryApplyNausea,10);
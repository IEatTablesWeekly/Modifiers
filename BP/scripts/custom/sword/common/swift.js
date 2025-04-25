import { hasLoreInHeldItem , toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';
import { TicksPerSecond } from '@minecraft/server'

function tryApplySwift(player) {
    if (!hasLoreInHeldItem(player, 'swift')) return;
    player.addEffect("haste", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
    displayOnActionbar(player, '§r[§aSwift§r]', 40, 0)
}

toAllPlayers(tryApplySwift,10);






import { hasLoreInHeldItem , toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';
import { TicksPerSecond } from '@minecraft/server'

function tryApplyWorldRender(player) {
    if (!hasLoreInHeldItem(player, 'worldrender')) return;
    player.addEffect("haste", TicksPerSecond * 2, { amplifier: 3, showParticles: false });
    displayOnActionbar(player, '§r[§8Worldrender§r]', 40, 1)
}

toAllPlayers(tryApplyWorldRender,10);
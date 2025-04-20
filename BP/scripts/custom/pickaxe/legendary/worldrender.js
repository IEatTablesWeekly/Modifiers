import { hasLoreInHeldItem , toAllPlayers } from '../../../utils/utils.js';
import { TicksPerSecond } from '@minecraft/server'

function tryApplyWorldRender(player) {
    if (!hasLoreInHeldItem(player, 'worldrender')) return;
    player.addEffect("haste", TicksPerSecond * 2, { amplifier: 3, showParticles: false });
}

toAllPlayers(tryApplyWorldRender,10);
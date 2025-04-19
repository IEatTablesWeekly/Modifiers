import { hasLoreInHeldItem , toAllPlayers } from '../../../utils/utils.js';
import { TicksPerSecond } from '@minecraft/server'

function tryApplyVoidHandle(player) {
    if (!hasLoreInHeldItem(player, 'voidhandle')) return;
    player.addEffect("haste", TicksPerSecond * 2, { amplifier: 2, showParticles: false });
}

toAllPlayers(tryApplyVoidHandle,5);
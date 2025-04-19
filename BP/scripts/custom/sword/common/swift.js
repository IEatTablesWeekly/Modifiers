import { hasLoreInHeldItem , toAllPlayers } from '../../../utils/utils.js';
import { TicksPerSecond } from '@minecraft/server'

function tryApplySwift(player) {
    if (!hasLoreInHeldItem(player, 'swift')) return;
    player.addEffect("haste", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
    player.onScreenDisplay.setActionBar('§r[§aSwift§r]');
}

toAllPlayers(tryApplySwift,5);






import { TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem , toAllPlayers } from '../../../utils/utils.js';

function tryApplyNausea(player) {
    if (!hasLoreInHeldItem(player, 'cacophony of collapse')) return;
    player.addEffect("nausea", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
    player.onScreenDisplay.setActionBar('§r[§8Cacophony of Collapse§r]');
}

toAllPlayers(tryApplyNausea, TicksPerSecond * 0.5);
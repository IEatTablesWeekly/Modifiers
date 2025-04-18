import { TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem , toAllPlayers } from '../../../utils/utils.js';

function tryApplyDarkness(player) {
    if (!hasLoreInHeldItem(player, 'darkness')) return;
    player.addEffect("darkness", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
    player.addEffect("strength", TicksPerSecond * 2, { amplifier: 1, showParticles: false });
    player.onScreenDisplay.setActionBar('§r[§8Bound To Darkness§r]');
}

toAllPlayers(tryApplyDarkness, TicksPerSecond * 0.5);
import { TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem , toAllPlayers } from '../../../utils/utils.js';

function tryApplyResilience(player) {
    if (!hasLoreInHeldItem(player, 'resilience')) return;
    player.addEffect("resistance", TicksPerSecond * 2, { amplifier: 1, showParticles: false });
    player.onScreenDisplay.setActionBar('§r[§8Resilience§r]');
}

toAllPlayers(tryApplyResilience, TicksPerSecond * 0.5);
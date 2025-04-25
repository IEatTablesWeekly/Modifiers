import { TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem , toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyResilience(player) {
    if (!hasLoreInHeldItem(player, 'resilience')) return;
    player.addEffect("resistance", TicksPerSecond * 2, { amplifier: 1, showParticles: false });
    displayOnActionbar(player, '§r[§8Resilience§r]', 40, 0)
}

toAllPlayers(tryApplyResilience,10);
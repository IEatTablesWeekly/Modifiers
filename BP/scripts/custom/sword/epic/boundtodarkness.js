import { hasLoreInHeldItem , toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyDarkness(player) {
    if (!hasLoreInHeldItem(player, 'darkness')) return;
    player.addEffect("darkness", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
    player.addEffect("strength", TicksPerSecond * 2, { amplifier: 1, showParticles: false });
    displayOnActionbar(player, '§r[§8Bound To Darkness§r]', 40, 0)
}

toAllPlayers(tryApplyDarkness,10);
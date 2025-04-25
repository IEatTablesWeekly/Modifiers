import { hasLoreInHeldItem, toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyHeavy(player) {
    if (!hasLoreInHeldItem(player, 'heavy')) return;
    player.addEffect("slowness", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
    player.addEffect("mining_fatigue", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
    player.onScreenDisplay.setActionBar('§r[§7Heavy§r]');
    displayOnActionbar(player, '§r[§7Heavy§r]', 40, 0)
}

toAllPlayers(tryApplyHeavy,10);


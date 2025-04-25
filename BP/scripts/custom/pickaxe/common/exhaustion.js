import { world , TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyExhaustion(player) {
    if (Math.random() > 0.05) return;

    if (!hasLoreInHeldItem(player, 'exhaustion')) return;


      player.addEffect("mining_fatigue", TicksPerSecond * 5, { amplifier: 3, showParticles: false });
      player.playSound('random.break');
      displayOnActionbar(player, '§r[§rExhausted§r]', 40, 1)
}

world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
    if (player?.isValid()) {
        tryApplyExhaustion(player);
    }
});

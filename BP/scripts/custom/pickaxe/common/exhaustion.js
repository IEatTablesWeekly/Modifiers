import { world , TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

function tryApplyExhaustion(player) {
    if (Math.random() > 0.05) return;

    if (!hasLoreInHeldItem(player, 'exhaustion')) return;


      player.addEffect("mining_fatigue", TicksPerSecond * 5, { amplifier: 3, showParticles: false });
      player.playSound('random.break');
      player.onScreenDisplay.setActionBar('§r[§rExhausted§r]');
}

world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
    if (player?.isValid()) {
        tryApplyExhaustion(player);
    }
});

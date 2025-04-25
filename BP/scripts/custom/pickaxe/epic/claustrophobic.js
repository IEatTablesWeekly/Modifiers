import { world, TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyClaustrophobic(player) {
    if (!hasLoreInHeldItem(player, 'claustrophobic')) return;

    const headBlockLoc = {
        x: Math.floor(player.location.x),
        y: Math.floor(player.location.y + 2),
        z: Math.floor(player.location.z)
    };

    const aboveBlock = player.dimension.getBlock(headBlockLoc);

    if (aboveBlock?.typeId !== 'minecraft:air') {
        player.addEffect("darkness", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
        player.addEffect("weakness", TicksPerSecond * 2, { amplifier: 0, showParticles: false });
        if (Math.random() < 0.05) {
            player.addEffect("blindness", TicksPerSecond * 7, { amplifier: 0, showParticles: false });
            player.addEffect("nausea", TicksPerSecond * 7, { amplifier: 0, showParticles: false });
        }
        player.playSound('ambient.cave');
        displayOnActionbar(player, '§r[§8Claustrophobic§r]', 40, 1)
    }
}

world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
    if (player?.isValid()) {
        tryApplyClaustrophobic(player);
    }
});

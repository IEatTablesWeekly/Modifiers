import { TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem, toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';

function applyTerrablitz(player) {
    if (!hasLoreInHeldItem(player, "terra")) return;  

    player.addEffect("speed", TicksPerSecond * 2, { amplifier: 6, showParticles: false });        
    player.addEffect("jump_boost", TicksPerSecond * 2, { amplifier: 2, showParticles: false });        
  
    displayOnActionbar(player, '§r[§qTerrablitz§r]', 40, 0)
    player.playSound('beacon.activate');

    const dimension = player.dimension;
    const origin = player.location;
    const radius = 5;

    const nearbyEntities = dimension.getEntities({
        location: origin,
        maxDistance: radius
    });

    for (const entity of nearbyEntities) {
        if (entity.id === player.id) continue;
        entity.addEffect("slowness", TicksPerSecond * 5, { amplifier: 2, showParticles: false });        
        entity.addEffect("nausea", TicksPerSecond * 5, { amplifier: 1, showParticles: false });
        entity.addEffect("weakness", TicksPerSecond * 5, { amplifier: 1, showParticles: false });
        entity.addEffect("darkness", TicksPerSecond * 5, { amplifier: 0, showParticles: false });
    }
}

toAllPlayers(applyTerrablitz, 5);


import { TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem, toAllPlayers } from '../../../utils/utils.js';

function applyCharged(player) {
    if (!hasLoreInHeldItem(player, 'charged')) return;

    const health = player.getComponent("health");
    if (!health) return;

    if (health.currentValue === health.defaultValue) {
        player.addEffect("strength", TicksPerSecond * 2, {
            amplifier: 2,
            showParticles: false
        });

        player.onScreenDisplay.setActionBar('§r[§uCharged§r]');
        player.playSound("beacon.activate");
    }
}

toAllPlayers(applyCharged);



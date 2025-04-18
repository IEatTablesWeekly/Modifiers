import { TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem, toAllPlayers } from '../../../utils/utils.js';

function applyCharged(player) {
    if (!hasLoreInHeldItem(player, 'charged')) return;
    if (player.getComponent("health")?.currentValue === player.getComponent("health")?.defaultValue) {
        player.runCommandAsync("effect @s strength 3 1 true");
        player.runCommandAsync(`title @s actionbar §r[§uCharged§r]`);
        player.runCommandAsync(`playsound beacon.activate @s ~ ~ ~`);
    }
}

toAllPlayers(applyCharged, TicksPerSecond * 0.5);



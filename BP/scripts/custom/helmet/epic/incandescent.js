import { EquipmentSlot, system } from '@minecraft/server';
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';

const lightBlockLifespan = 100;
const lightDecayQueue = [];

system.runInterval(() => {
    for (let i = lightDecayQueue.length - 1; i >= 0; i--) {
        const task = lightDecayQueue[i];
        task.ticksRemaining -= 5;

        if (task.ticksRemaining <= 0) {
            const { dimension, x, y, z } = task;
            const block = dimension.getBlock({ x, y, z });
            if (block && block.typeId.startsWith("minecraft:light_block")) {
                block.setType("minecraft:air");
            }
            lightDecayQueue.splice(i, 1);
        }
    }
}, 5);

function findSurfaceY(dimension, x, startY, z, maxSearchDistance = 6) {
    for (let offset = 0; offset <= maxSearchDistance; offset++) {
        const checkY = startY - offset;
        const block = dimension.getBlock({ x, y: checkY, z });
        if (block && block.typeId !== "minecraft:air") {
            return checkY + 1;
        }
    }
    return startY;
}

function tryApplyIncandescent(player) {
    if (!hasLoreInEquippedItem(player, 'incandescent', EquipmentSlot.Head)) return;

    const pos = player.location;
    const x = Math.floor(pos.x);
    const y = Math.floor(pos.y);
    const z = Math.floor(pos.z);
    const dimension = player.dimension;

    const radius = 10;

    const positions = [{ dx: 0, dz: 0 }];

    for (let angle = 0; angle < 360; angle += 45) {
        const radians = angle * (Math.PI / 180);
        const dx = Math.round(Math.cos(radians) * radius);
        const dz = Math.round(Math.sin(radians) * radius);
        positions.push({ dx, dz });
    }

    for (const offset of positions) {
        const placeX = x + offset.dx;
        const placeZ = z + offset.dz;
        const surfaceY = findSurfaceY(dimension, placeX, y, placeZ);

        const targetBlock = dimension.getBlock({ x: placeX, y: surfaceY, z: placeZ });
        if (targetBlock && targetBlock.typeId === "minecraft:air") {
            targetBlock.setType("minecraft:light_block_15");

            lightDecayQueue.push({
                dimension,
                x: placeX,
                y: surfaceY,
                z: placeZ,
                ticksRemaining: lightBlockLifespan
            });
        }
    }

    displayOnActionbar(player, '§r[§eIncandescent§r]', 40, 5);
}

toAllPlayers(tryApplyIncandescent, 10);

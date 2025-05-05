import { world, system, EquipmentSlot, TicksPerSecond } from "@minecraft/server";
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from "../../../utils/utils.js";

const transformedBlocks = new Map();

function getBlockKey(x, y, z) {
    return `${x},${y},${z}`;
  }

function isPlayerOnBlock(dimension, x, y, z) {
  for (const player of world.getPlayers()) {
    if (player.dimension !== dimension) continue;
    const pos = player.location;
    const px = Math.floor(pos.x);
    const py = Math.floor(pos.y - 1);
    const pz = Math.floor(pos.z);
    if (px === x && py === y && pz === z) {
      return true;
    }
  }
  return false;
}

function attemptRevertBlock(dimension, x, y, z) {
  const key = getBlockKey(x, y, z);
  if (isPlayerOnBlock(dimension, x, y, z)) {
    const timeoutId = system.runTimeout(() => {
      attemptRevertBlock(dimension, x, y, z);
    }, TicksPerSecond);
    transformedBlocks.set(key, timeoutId);
  } else {
    const block = dimension.getBlock({ x, y, z });
    if (block && block.typeId === "minecraft:cobblestone") {
      block.setType("minecraft:lava");
    }
    transformedBlocks.delete(key);
  }
}

function tryApplyMagmaWalker(player) {
  if (!hasLoreInEquippedItem(player, "magmawalker", EquipmentSlot.Feet)) return;

  const dimension = player.dimension;
  const pos = player.location;
  const px = Math.floor(pos.x);
  const py = Math.floor(pos.y - 1);
  const pz = Math.floor(pos.z);

  const radius = 3;
  const offsets = [];
  for (let dx = -radius; dx <= radius; dx++) {
    for (let dz = -radius; dz <= radius; dz++) {
      offsets.push([dx, 0, dz]);
    }
  }

  for (const [dx, dy, dz] of offsets) {
    const x = px + dx;
    const y = py + dy;
    const z = pz + dz;
    const key = getBlockKey(x, y, z);

    const block = dimension.getBlock({ x, y, z });
    const blockAbove = dimension.getBlock({ x, y: y + 1, z });

    if (
      block && block.typeId === "minecraft:lava" &&
      blockAbove && blockAbove.typeId === "minecraft:air"
    ) {
      block.setType("minecraft:cobblestone");
        
      system.runTimeout(() => displayOnActionbar(player, '§r[§vMagmawalker§r]', 40, 8), 3)

      if (!transformedBlocks.has(key)) {
        const delaySeconds = 4 + Math.random() * 2;
        const delayTicks = Math.floor(delaySeconds * TicksPerSecond);
        const timeoutId = system.runTimeout(() => {
          attemptRevertBlock(dimension, x, y, z);
        }, delayTicks);
        transformedBlocks.set(key, timeoutId);
      }
    }
  }
}

toAllPlayers(tryApplyMagmaWalker, 1);

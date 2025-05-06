import { system, EquipmentSlot, TicksPerSecond } from "@minecraft/server";
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from "../../../utils/utils.js";

function isInWeb(player) {
  const { x, y, z } = player.location;
  const dimension = player.dimension;

  const offsets = [
    [0, 0, 0], [0.3, 0, 0.3], [-0.3, 0, 0.3],
    [0.3, 0, -0.3], [-0.3, 0, -0.3], [0, 1, 0],
    [0.3, 1, 0.3], [-0.3, 1, 0.3], [0.3, 1, -0.3],
    [-0.3, 1, -0.3]
  ];

  for (const [dx, dy, dz] of offsets) {
    const block = dimension.getBlock({
      x: Math.floor(x + dx),
      y: Math.floor(y + dy),
      z: Math.floor(z + dz)
    });

    if (block?.typeId === "minecraft:web") return true;
  }

  return false;
}

function tryApplyPhasewalk(player) {
  if (!hasLoreInEquippedItem(player, "phasewalk", EquipmentSlot.Feet)) {
    player.removeEffect("speed");
    return;
  }

  if (isInWeb(player)) {
    system.run(() =>
      player.addEffect("speed", TicksPerSecond * 12, {
        amplifier: 50,
        showParticles: false
      })
    );
    displayOnActionbar(player, `§r[§6Phasewalk§r]`, 10, 8);
  } else {
    player.removeEffect("speed");
  }
}

toAllPlayers(tryApplyPhasewalk, 1);

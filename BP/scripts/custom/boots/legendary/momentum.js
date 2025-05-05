import { EquipmentSlot, TicksPerSecond } from "@minecraft/server";
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from "../../../utils/utils.js";

const sprintCounters = new Map();
const damageTimers = new Map();

function tryApplyMomentum(player) {
  const id = player.id;

  if (!hasLoreInEquippedItem(player, "momentum", EquipmentSlot.Feet)) {
    sprintCounters.delete(id);
    damageTimers.delete(id);
    player.removeEffect("speed");
    return;
  }

  if (player.isSprinting) {
    const current = sprintCounters.get(id) ?? 0;
    const newCounter = current + 1;
    sprintCounters.set(id, newCounter);

    const seconds = Math.floor(newCounter / TicksPerSecond);
    const amplifier = Math.min(Math.floor(seconds / 5), 100);

    player.addEffect("speed", 4, { amplifier, showParticles: false });

    if (amplifier > 15) {
      displayOnActionbar(player, `§r[§cMomentum: §4${amplifier}§r/§415§r] §r[§cOverload§r]`, 10, 8);

      const ticksSinceDamage = damageTimers.get(id) ?? 0;
      if (ticksSinceDamage >= TicksPerSecond * 3) {
        player.applyDamage((amplifier - 15)/2, { cause: "flyIntoWall" });
        damageTimers.set(id, 0);
      } else {
        damageTimers.set(id, ticksSinceDamage + 2);
      }
    } else {
      displayOnActionbar(player, `§r[§6Momentum: §b${amplifier}§r/§b15§r]`, 10, 8);
      damageTimers.set(id, 0);
    }
  } else {
    sprintCounters.delete(id);
    damageTimers.delete(id);
    player.removeEffect("speed");
  }
}

toAllPlayers(tryApplyMomentum, 1);

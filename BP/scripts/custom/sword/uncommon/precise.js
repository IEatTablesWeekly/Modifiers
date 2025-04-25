import { world } from "@minecraft/server";
import { hasLoreInHeldItem, displayOnActionbar } from "../../../utils/utils.js";

world.afterEvents.entityHurt.subscribe((event) => {
  if (event.damageSource.cause !== "entityAttack") return;

  const damagedEntity = event.hurtEntity;
  const attacker = event.damageSource.damagingEntity;

  if (!attacker) return;

  if (!hasLoreInHeldItem(attacker, "precise")) return;

  const health = damagedEntity.getComponent("minecraft:health");
  if (!health) return;

  if (Math.random() < 0.1) {
    health.setCurrentValue(Math.max(0, health.currentValue + 3));
    attacker.playSound("random.orb");
    displayOnActionbar(attacker, "§r[§bPrecise Hit§r]", 40, 0);
  }
});

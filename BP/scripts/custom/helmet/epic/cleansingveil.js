import { world, EquipmentSlot } from '@minecraft/server';
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyCleansingVeil(player) {
    if (!hasLoreInEquippedItem(player, 'cleansing veil', EquipmentSlot.Head)) return;

    const negativeEffects = [
        "minecraft:blindness",
        "minecraft:darkness",
        "minecraft:hunger",
        "minecraft:nausea",
        "minecraft:poison",
        "minecraft:slowness",
        "minecraft:weakness",
        "minecraft:wither",
        "minecraft:levitation",
        "minecraft:mining_fatigue",
        "minecraft:instant_damage"
    ];

    for (const effectId of negativeEffects) {
        player.removeEffect(effectId);
    }

    displayOnActionbar(player, '§r[§aCleansing Veil§r]', 40, 5);
}

toAllPlayers(tryApplyCleansingVeil, 10);

world.afterEvents.entityHurt.subscribe((event) => {
  const entity = event.hurtEntity;

  if (!entity || !entity.getComponent || !hasLoreInEquippedItem(entity, 'cleansing veil', EquipmentSlot.Head)) return;

  const damageCause = event.damageSource?.cause;
  const healedAmount = event.damage;

  if (damageCause === "magic") {
      if (typeof healedAmount !== "number" || isNaN(healedAmount)) return;

      const healthComp = entity.getComponent("minecraft:health");
      if (healthComp) {
          const max = healthComp.value;
          healthComp.setCurrentValue(Math.min(healthComp.defaultValue, healthComp.currentValue + healedAmount));
      }
  }
});


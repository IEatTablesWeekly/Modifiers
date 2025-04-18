import { world } from "@minecraft/server";
import { hasLoreInHeldItem } from "../../../utils/utils.js";

function extractFirstNumberFromLore(loreLines) {
    for (const line of loreLines) {
        const match = line.match(/(\d+)/);
        if (match) {
            return parseInt(match[1]);
        }
    }
    return null;
}

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;
    if (!attacker || !attacker.isValid()) return;

    const inventory = attacker.getComponent('minecraft:inventory')?.container;
    const item = inventory?.getItem(attacker.selectedSlotIndex);
    if (!item || !hasLoreInHeldItem(attacker, "excalibur")) return;

    const loreLines = item.getLore();
    const loreDamage = extractFirstNumberFromLore(loreLines);
    if (loreDamage === null) return;

    const eventDamage = event.damage;
    const extraDamage = loreDamage - eventDamage;
    if (extraDamage <= 0) return;

    const healthComp = damagedEntity.getComponent('minecraft:health');
    if (!healthComp) return;

    const newHealth = Math.max(0, healthComp.currentValue - extraDamage);
    healthComp.setCurrentValue(newHealth);
});

import { world, system, ItemStack, ItemTypes } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

const lootTable = [
  { id: 'minecraft:coal', weight: 40, min: 1, max: 3, color: '7' },
  { id: 'minecraft:iron_nugget', weight: 30, min: 1, max: 7, color: 'f' },
  { id: 'minecraft:gold_nugget', weight: 15, min: 1, max: 6, color: '6' },
  { id: 'minecraft:iron_ingot', weight: 5, min: 1, max: 2, color: 'f' },
  { id: 'minecraft:gold_ingot', weight: 5, min: 1, max: 2, color: '6' },
  { id: 'minecraft:emerald', weight: 4, min: 1, max: 1, color: 'a' },
  { id: 'minecraft:diamond', weight: 0.5, min: 1, max: 1, color: 'b' },
  { id: 'minecraft:netherite_scrap', weight: 0.5, min: 1, max: 1, color: 'n' },
];

function getWeightedRandomItem() {
  const totalWeight = lootTable.reduce((sum, entry) => sum + entry.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const entry of lootTable) {
    if (rand < entry.weight) {
      const count = Math.floor(Math.random() * (entry.max - entry.min + 1)) + entry.min;
      return {
        item: new ItemStack(ItemTypes.get(entry.id), count),
        id: entry.id,
        amount: count,
        color: entry.color
      };
    }
    rand -= entry.weight;
  }
  return null;
}

world.afterEvents.entityHurt.subscribe((event) => {
  if (event.damageSource.cause !== "entityAttack") return;
  const deadEntity = event.hurtEntity;
  const attacker = event.damageSource.damagingEntity;

  if (!attacker || !deadEntity || !deadEntity.isValid()) return;
  if (!hasLoreInHeldItem(attacker, 'lucky')) return;

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
  system.runTimeout(() => {
    if (deadEntity.isValid() && Math.random() < 0.1) {
      const pos = deadEntity.location;
      const drop = getWeightedRandomItem();
      if (drop) {
        deadEntity.dimension.spawnItem(drop.item, pos);
  
        const readableName = toTitleCase(drop.id.replace("minecraft:", "").replace(/_/g, " "));
        const colorCode = `§${drop.color}`;
        attacker.onScreenDisplay.setActionBar(`[§gLucky §r| ${colorCode}${drop.amount}x ${readableName}§r]`);
        attacker.playSound('random.orb')
      }
    }
  }, 5);

});

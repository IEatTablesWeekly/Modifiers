import { world, system, ItemStack, ItemTypes, BlockTypes } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

const targetBlocks = [
  'minecraft:stone',
  'minecraft:deepslate',
  'minecraft:granite',
  'minecraft:andesite',
  'minecraft:diorite',
  'minecraft:calcite',
];

const lootTable = [
  { id: 'minecraft:coal', weight: 20, min: 1, max: 3, color: '7' },
  { id: 'minecraft:iron_ingot', weight: 20, min: 1, max: 2, color: 'f' },
  { id: 'minecraft:gold_ingot', weight: 20, min: 1, max: 2, color: '6' },
  { id: 'minecraft:copper_ingot', weight: 20, min: 1, max: 2, color: '6' },
  { id: 'minecraft:quartz', weight: 20, min: 1, max: 2, color: '6' },
  { id: 'minecraft:amethyst_shard', weight: 20, min: 1, max: 2, color: '6' },
  { id: 'minecraft:lapis_lazuli', weight: 20, min: 1, max: 2, color: 'f' },
  { id: 'minecraft:redstone', weight: 20, min: 1, max: 2, color: '6' },
  { id: 'minecraft:emerald', weight: 20, min: 1, max: 3, color: 'a' },
  { id: 'minecraft:diamond', weight: 2, min: 1, max: 1, color: 'b' },
  { id: 'minecraft:netherite_scrap', weight: 1, min: 1, max: 1, color: 'n' },
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

world.afterEvents.playerBreakBlock.subscribe(event => {
  const { player, brokenBlockPermutation, block } = event;
  const blockId = brokenBlockPermutation.type.id;

  if (!targetBlocks.includes(blockId)) return;
  if (!hasLoreInHeldItem(player, 'midas')) return;
  console.log("henlo")

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  system.runTimeout(() => {
      const pos = block.location;
      const drop = getWeightedRandomItem();
      if (drop) {
        block.dimension.spawnItem(drop.item, pos);
        const readableName = toTitleCase(drop.id.replace("minecraft:", "").replace(/_/g, " "));
        const colorCode = `§${drop.color}`;
        player.onScreenDisplay.setActionBar(`[§eMidas Touch §r| ${colorCode}${drop.amount}x ${readableName}§r]`);
        player.playSound('random.orb');
      }
  }, 5);
});

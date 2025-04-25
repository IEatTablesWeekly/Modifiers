import { world, TicksPerSecond } from "@minecraft/server";
import { hasLoreInHeldItem, displayOnActionbar } from "../../../utils/utils.js";

const oreBlocks = new Set([
  "minecraft:coal_ore",
  "minecraft:copper_ore",
  "minecraft:diamond_ore",
  "minecraft:emerald_ore",
  "minecraft:gold_ore",
  "minecraft:iron_ore",
  "minecraft:lapis_ore",
  "minecraft:nether_gold_ore",
  "minecraft:nether_quartz_ore",
  "minecraft:redstone_ore",
  "minecraft:deepslate_redstone_ore",
  "minecraft:deepslate_coal_ore",
  "minecraft:deepslate_copper_ore",
  "minecraft:deepslate_diamond_ore",
  "minecraft:deepslate_emerald_ore",
  "minecraft:deepslate_gold_ore",
  "minecraft:deepslate_iron_ore",
  "minecraft:deepslate_lapis_ore",
  "minecraft:ancient_debris",
]);

world.afterEvents.playerBreakBlock.subscribe(
  ({ player, brokenBlockPermutation }) => {
    const blockId = brokenBlockPermutation.type.id;

    if (!oreBlocks.has(blockId)) return;
    if (!hasLoreInHeldItem(player, "jeweller")) return;

    player.playSound("random.orb");
    player.addEffect("haste", TicksPerSecond * 12, { amplifier: 1, showParticles: false });
    displayOnActionbar(player, "§r[§5Jeweller§r]", 40, 1);
  }
);

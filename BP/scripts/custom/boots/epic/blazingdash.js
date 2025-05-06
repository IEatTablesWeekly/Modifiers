import { world, system, EquipmentSlot, TicksPerSecond } from "@minecraft/server";
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from "../../../utils/utils.js";

const fireBlocks = new Map();

const passableBlocks = new Set([
  "minecraft:air", "minecraft:web", "minecraft:water", "minecraft:structure_void", "minecraft:light_block",
  "minecraft:snow_layer", "minecraft:grass", "minecraft:tall_grass", "minecraft:bush", "minecraft:fern",
  "minecraft:large_fern", "minecraft:dead_bush", "minecraft:dandelion", "minecraft:poppy", "minecraft:blue_orchid",
  "minecraft:allium", "minecraft:azure_bluet", "minecraft:red_tulip", "minecraft:orange_tulip", "minecraft:white_tulip",
  "minecraft:pink_tulip", "minecraft:oxeye_daisy", "minecraft:cornflower", "minecraft:lily_of_the_valley",
  "minecraft:wither_rose", "minecraft:seagrass", "minecraft:tall_seagrass", "minecraft:kelp", "minecraft:kelp_plant",
  "minecraft:beetroot", "minecraft:carrots", "minecraft:potatoes", "minecraft:wheat", "minecraft:melon_stem",
  "minecraft:pumpkin_stem", "minecraft:torchflower_crop", "minecraft:pitcher_crop", "minecraft:nether_wart",
  "minecraft:crimson_fungus", "minecraft:warped_fungus", "minecraft:crimson_roots", "minecraft:warped_roots",
  "minecraft:nether_sprouts", "minecraft:cave_vines", "minecraft:cave_vines_body_with_berries",
  "minecraft:cave_vines_head_with_berries", "minecraft:glow_berries", "minecraft:red_mushroom", "minecraft:brown_mushroom",
  "minecraft:tube_coral", "minecraft:brain_coral", "minecraft:bubble_coral", "minecraft:fire_coral", "minecraft:horn_coral",
  "minecraft:tube_coral_fan", "minecraft:brain_coral_fan", "minecraft:bubble_coral_fan", "minecraft:fire_coral_fan",
  "minecraft:horn_coral_fan", "minecraft:dead_tube_coral", "minecraft:dead_brain_coral", "minecraft:dead_bubble_coral",
  "minecraft:dead_fire_coral", "minecraft:dead_horn_coral", "minecraft:dead_tube_coral_fan", "minecraft:dead_brain_coral_fan",
  "minecraft:dead_bubble_coral_fan", "minecraft:dead_fire_coral_fan", "minecraft:dead_horn_coral_fan",
  "minecraft:nether_portal", "minecraft:fire", "minecraft:soul_fire", "minecraft:ladder", "minecraft:scaffolding",
  "minecraft:torch", "minecraft:wall_torch", "minecraft:soul_torch", "minecraft:soul_wall_torch", "minecraft:button",
  "minecraft:stone_button", "minecraft:lever", "minecraft:tripwire", "minecraft:tripwire_hook", "minecraft:carpet",
  "minecraft:moss_carpet", "minecraft:banner", "minecraft:sign", "minecraft:standing_sign", "minecraft:wall_sign",
  "minecraft:glow_lichen", "minecraft:flower_pot", "minecraft:rail", "minecraft:powered_rail", "minecraft:detector_rail",
  "minecraft:activator_rail", "minecraft:bubble_column", "minecraft:redstone_wire", "minecraft:redstone_torch",
  "minecraft:wooden_button", "minecraft:light_weighted_pressure_plate", "minecraft:heavy_weighted_pressure_plate",
  "minecraft:pressure_plate"
]);

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
    if (px === x && py === y && pz === z) return true;
  }
  return false;
}

function tryRevertFire(dimension, x, y, z) {
  const key = getBlockKey(x, y, z);
  if (isPlayerOnBlock(dimension, x, y - 1, z)) {
    const retry = system.runTimeout(() => tryRevertFire(dimension, x, y, z), TicksPerSecond);
    fireBlocks.set(key, retry);
  } else {
    const block = dimension.getBlock({ x, y, z });
    if (block && block.typeId === "minecraft:fire") block.setType("minecraft:air");
    fireBlocks.delete(key);
  }
}

function tryApplyBlazingDash(player) {
  if (!hasLoreInEquippedItem(player, "blazing dash", EquipmentSlot.Feet)) return;

  if (player.isSprinting) {
    displayOnActionbar(player, '§r[§vBlazing Dash§r]', 40, 8);
    system.run(() => {
      const dimension = player.dimension;
      const pos = player.location;
      dimension.spawnParticle("minecraft:lava_particle", { x: pos.x, y: pos.y, z: pos.z });
      dimension.playSound("liquid.lava", pos);
      player.addEffect("fire_resistance", TicksPerSecond * 12, { amplifier: 0, showParticles: false })
      player.addEffect("speed", TicksPerSecond * 12, { amplifier: 4, showParticles: false })
    });

    const dimension = player.dimension;
    const pos = player.location;
    const x = Math.floor(pos.x);
    const y = Math.floor(pos.y);
    const z = Math.floor(pos.z);
    const fireY = y - 1 + 1;

    const key = getBlockKey(x, fireY, z);

    const fireBlock = dimension.getBlock({ x, y: fireY, z });
    const belowBlock = dimension.getBlock({ x, y: fireY - 1, z });

    if (
      fireBlock && belowBlock &&
      passableBlocks.has(fireBlock.typeId) &&
      fireBlock.typeId !== "minecraft:fire"
    ) {
      
      system.runTimeout(() => fireBlock.setType("minecraft:fire"), 3);

      if (!fireBlocks.has(key)) {
        const timeout = system.runTimeout(() => {
          tryRevertFire(dimension, x, fireY, z);
        }, TicksPerSecond);
        fireBlocks.set(key, timeout);
      }
    }
  } else {
    player.removeEffect("speed");
    player.removeEffect("fire_resistance");
  }
}

toAllPlayers(tryApplyBlazingDash, 1);

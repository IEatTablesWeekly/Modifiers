import { hasLoreInHeldItem, toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';

const excludeEntities = new Set([
    "minecraft:item", "minecraft:agent", "minecraft:area_effect_cloud", "minecraft:armor_stand", "minecraft:arrow", "minecraft:boat",
    "minecraft:chest", "minecraft:chest_boat", "minecraft:chest_minecart", "minecraft:command_block_minecart",
    "minecraft:dragon_fireball", "minecraft:minecart", "minecraft:fireball", "minecraft:egg", "minecraft:ender_crystal",
    "minecraft:ender_pearl", "minecraft:eye_of_ender_signal", "minecraft:fireworks_rocket", "minecraft:fishing_hook",
    "minecraft:hopper_minecart", "minecraft:lightning_bolt", "minecraft:lingering_potion", "minecraft:player", "minecraft:potion",
    "minecraft:llama_spit", "minecraft:npc", "minecraft:shulker_bullet", "minecraft:snowball", "minecraft:small_fireball",
    "minecraft:splash_potion", "minecraft:thrown_trident", "minecraft:tnt", "minecraft:tnt_minecart", "minecraft:tripod_camera",
    "minecraft:wither_skull", "minecraft:wither_skull_dangerous", "minecraft:xp_bottle", "minecraft:xp_orb"
  ]);

function applyForcefield(player) {
    if (!hasLoreInHeldItem(player, "sentinel")) return;
    if (player.isSneaking) return;

    displayOnActionbar(player, '§r[§sSentinel Active§r]', 40, 0)
    player.playSound('beacon.activate');

    const dimension = player.dimension;
    const origin = player.location;
    const radius = 12;
    
    const nearbyEntities = dimension.getEntities({
        location: origin,
        maxDistance: radius,
        excludeTypes: Array.from(excludeEntities)
      });
    
    for (const entity of nearbyEntities) {
        if (entity.id === player.id) continue;

        const directionX = entity.location.x - origin.x;
        const directionZ = entity.location.z - origin.z;
        const length = Math.sqrt(directionX ** 2 + directionZ ** 2);

        if (length === 0) continue;

        const knockX = directionX / length;
        const knockZ = directionZ / length;

        entity.applyKnockback(knockX, knockZ, 0.5, 0.2);
        entity.applyDamage(1, { cause: "thorns", damagingEntity: player });
    }
}

toAllPlayers(applyForcefield, 10);

import { world } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

const excludeEntities = new Set([
  "minecraft:item","agent", "area_effect_cloud", "armor_stand", "arrow", "boat",
  "chest", "chest_boat", "chest_minecart", "command_block_minecart",
  "dragon_fireball", "minecart", "fireball", "egg", "ender_crystal",
  "ender_pearl", "eye_of_ender_signal", "fireworks_rocket", "fishing_hook",
  "hopper_minecart", "lightning_bolt", "lingering_potion", "player", "potion",
  "llama_spit", "npc", "shulker_bullet", "snowball", "small_fireball",
  "splash_potion", "thrown_trident", "tnt", "tnt_minecart", "tripod_camera",
  "wither_skull", "wither_skull_dangerous", "xp_bottle", "xp_orb"
]);

function tryApplyEarthshaker(player){
    if (!hasLoreInHeldItem(player, "earthshaker")) return;
    if (player.isSneaking) return;

    displayOnActionbar(player, '§r[§nEarth Shaker§r]', 40, 1)
    player.playSound('block.bamboo.break');

    const dimension = player.dimension;
    const origin = player.location;
    const radius = 9;

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

        entity.applyKnockback(knockX, knockZ, 1, 0.7);
        entity.applyDamage(3, { cause: "thorns", damagingEntity: player });
    }
}

world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
    if (player?.isValid()) {
        tryApplyEarthshaker(player);
    }
});
import { world, TicksPerSecond } from '@minecraft/server';
import { hasLoreInHeldItem, displayOnActionbar } from '../../../utils/utils.js';

world.afterEvents.entityHurt.subscribe((event) => {
    if (event.damageSource.cause !== "entityAttack") return;

    const damagedEntity = event.hurtEntity;
    const attacker = event.damageSource.damagingEntity;

    if (!attacker || !damagedEntity) return;
    if (!attacker.isValid() || !damagedEntity.isValid()) return;
    if (!hasLoreInHeldItem(attacker, 'shadowstep')) return;

    const dimension = world.getDimension(attacker.dimension.id);
    const { x, y, z } = attacker.location;
    const offsets = [
        [0.3, 1.8, 0.3], [-0.3, 1.8, 0.3],
        [0.3, 1.8, -0.3], [-0.3, 1.8, -0.3],
        [0.3, 1.6, 0.3], [-0.3, 1.6, 0.3],
        [0.3, 1.6, -0.3], [-0.3, 1.6, -0.3],
        [0.4, 1.5, 0], [-0.4, 1.5, 0],
        [0.3, 1.2, 0.3], [-0.3, 1.2, 0.3],
        [0.3, 1.2, -0.3], [-0.3, 1.2, -0.3],
        [0.5, 1.4, 0.2], [-0.5, 1.4, 0.2],
        [0.5, 1.2, -0.2], [-0.5, 1.2, -0.2],
        [0.3, 1.0, 0.3], [-0.3, 1.0, 0.3],
        [0.3, 1.0, -0.3], [-0.3, 1.0, -0.3],
        [0.2, 0.6, 0.2], [-0.2, 0.6, 0.2],
        [0.2, 0.6, -0.2], [-0.2, 0.6, -0.2],
        [0.2, 0.3, 0.2], [-0.2, 0.3, 0.2],
        [0.2, 0.3, -0.2], [-0.2, 0.3, -0.2],
        [0.2, 0.0, 0.2], [-0.2, 0.0, 0.2],
        [0.2, 0.0, -0.2], [-0.2, 0.0, -0.2],
    ];

    for (const [dx, dy, dz] of offsets) {
        dimension.spawnParticle("minecraft:falling_dust_dragon_egg_particle", {
            x: x + dx,
            y: y + dy,
            z: z + dz
          });
    }

    const targetViewDir = damagedEntity.getViewDirection();

    const behindOffset = {
        x: -targetViewDir.x * 1.5,
        y: 0,
        z: -targetViewDir.z * 1.5,
    };

    const damagedLoc = damagedEntity.location;
    const teleportPos = {
        x: damagedLoc.x + behindOffset.x,
        y: damagedLoc.y,
        z: damagedLoc.z + behindOffset.z
    };

    const blockAtTarget = damagedEntity.dimension.getBlock({
        x: Math.floor(teleportPos.x),
        y: Math.floor(teleportPos.y),
        z: Math.floor(teleportPos.z),
    });

    const blockAbove = damagedEntity.dimension.getBlock({
        x: Math.floor(teleportPos.x),
        y: Math.floor(teleportPos.y + 1),
        z: Math.floor(teleportPos.z),
    });

    const passableBlocks = new Set([
        "minecraft:air",
        "minecraft:web",
        "minecraft:water",
        "minecraft:structure_void",
        "minecraft:light_block",
        "minecraft:snow_layer",
        "minecraft:grass",
        "minecraft:tall_grass",
        "minecraft:bush",
        "minecraft:fern",
        "minecraft:large_fern",
        "minecraft:dead_bush",
        "minecraft:dandelion",
        "minecraft:poppy",
        "minecraft:blue_orchid",
        "minecraft:allium",
        "minecraft:azure_bluet",
        "minecraft:red_tulip",
        "minecraft:orange_tulip",
        "minecraft:white_tulip",
        "minecraft:pink_tulip",
        "minecraft:oxeye_daisy",
        "minecraft:cornflower",
        "minecraft:lily_of_the_valley",
        "minecraft:wither_rose",
        "minecraft:seagrass",
        "minecraft:tall_seagrass",
        "minecraft:kelp",
        "minecraft:kelp_plant",
        "minecraft:beetroot",
        "minecraft:carrots",
        "minecraft:potatoes",
        "minecraft:wheat",
        "minecraft:melon_stem",
        "minecraft:pumpkin_stem",
        "minecraft:torchflower_crop",
        "minecraft:pitcher_crop",
        "minecraft:nether_wart",
        "minecraft:crimson_fungus",
        "minecraft:warped_fungus",
        "minecraft:crimson_roots",
        "minecraft:warped_roots",
        "minecraft:nether_sprouts",
        "minecraft:cave_vines",
        "minecraft:cave_vines_body_with_berries",
        "minecraft:cave_vines_head_with_berries",
        "minecraft:glow_berries",
        "minecraft:red_mushroom",
        "minecraft:brown_mushroom",
        "minecraft:tube_coral",
        "minecraft:brain_coral",
        "minecraft:bubble_coral",
        "minecraft:fire_coral",
        "minecraft:horn_coral",
        "minecraft:tube_coral_fan",
        "minecraft:brain_coral_fan",
        "minecraft:bubble_coral_fan",
        "minecraft:fire_coral_fan",
        "minecraft:horn_coral_fan",
        "minecraft:dead_tube_coral",
        "minecraft:dead_brain_coral",
        "minecraft:dead_bubble_coral",
        "minecraft:dead_fire_coral",
        "minecraft:dead_horn_coral",
        "minecraft:dead_tube_coral_fan",
        "minecraft:dead_brain_coral_fan",
        "minecraft:dead_bubble_coral_fan",
        "minecraft:dead_fire_coral_fan",
        "minecraft:dead_horn_coral_fan",
        "minecraft:nether_portal",
        "minecraft:fire",
        "minecraft:soul_fire",
        "minecraft:ladder",
        "minecraft:scaffolding",
        "minecraft:torch",
        "minecraft:wall_torch",
        "minecraft:soul_torch",
        "minecraft:soul_wall_torch",
        "minecraft:button",
        "minecraft:stone_button",
        "minecraft:lever",
        "minecraft:tripwire",
        "minecraft:tripwire_hook",
        "minecraft:carpet",
        "minecraft:moss_carpet",
        "minecraft:banner",
        "minecraft:sign",
        "minecraft:standing_sign",
        "minecraft:wall_sign",
        "minecraft:glow_lichen",
        "minecraft:flower_pot",
        "minecraft:rail",
        "minecraft:powered_rail",
        "minecraft:detector_rail",
        "minecraft:activator_rail",
        "minecraft:bubble_column",
        "minecraft:redstone_wire",
        "minecraft:redstone_torch",
        "minecraft:lever",
        "minecraft:tripwire_hook",
        "minecraft:stone_button",
        "minecraft:wooden_button",
        "minecraft:light_weighted_pressure_plate",
        "minecraft:heavy_weighted_pressure_plate",
        "minecraft:pressure_plate"
      ]);
      

    if (
        passableBlocks.has(blockAtTarget?.typeId) &&
        passableBlocks.has(blockAbove?.typeId)
    ) {
        attacker.teleport(teleportPos, {
            facingLocation: damagedLoc,
        });
        const attackerViewDir = attacker.getViewDirection();
        if (damagedEntity.isValid) {
            damagedEntity.applyKnockback(attackerViewDir.x, attackerViewDir.z, 1, 0.1);
        }

        attacker.addEffect("strength", TicksPerSecond * 5, { amplifier: 1, showParticles: false });
        attacker.addEffect("invisibility", TicksPerSecond * 5, { amplifier: 0, showParticles: false });
        damagedEntity.addEffect("darkness", TicksPerSecond * 2, { amplifier: 0, showParticles: false });

        displayOnActionbar(attacker, '§r[§0Shadowstep§r]', 40, 0)
    }
});

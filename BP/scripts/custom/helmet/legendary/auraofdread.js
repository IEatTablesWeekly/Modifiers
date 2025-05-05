import { EquipmentSlot, TicksPerSecond } from '@minecraft/server';
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';

const excludeEntities = new Set([
    "minecraft:item", "minecraft:agent", "minecraft:area_effect_cloud", "minecraft:armor_stand", "minecraft:arrow", "minecraft:boat",
    "minecraft:chest", "minecraft:chest_boat", "minecraft:chest_minecart", "minecraft:command_block_minecart",
    "minecraft:dragon_fireball", "minecraft:minecart", "minecraft:fireball", "minecraft:egg", "minecraft:ender_crystal",
    "minecraft:ender_pearl", "minecraft:eye_of_ender_signal", "minecraft:fireworks_rocket", "minecraft:fishing_hook",
    "minecraft:hopper_minecart", "minecraft:lightning_bolt", "minecraft:lingering_potion", "minecraft:potion",
    "minecraft:llama_spit", "minecraft:npc", "minecraft:shulker_bullet", "minecraft:snowball", "minecraft:small_fireball",
    "minecraft:splash_potion", "minecraft:thrown_trident", "minecraft:tnt", "minecraft:tnt_minecart", "minecraft:tripod_camera",
    "minecraft:wither_skull", "minecraft:wither_skull_dangerous", "minecraft:xp_bottle", "minecraft:xp_orb"
]);

function applyAuraLogic(player) {
    if (!hasLoreInEquippedItem(player, 'aura of dread', EquipmentSlot.Head)) return;

    const ray = player.getEntitiesFromViewDirection({
        maxDistance: 10,
        includeEntities: true,
        includeBlocks: false
    });

    if (ray.length > 0) {
        const entity = ray[0].entity;

        if (
            entity &&
            entity.id !== player.id &&
            !excludeEntities.has(entity.typeId)
        ) {
            const viewDir = player.getViewDirection();
            entity.applyKnockback(viewDir.x, viewDir.z, 0.5, 0.2);
            entity.applyDamage(1, { cause: "thorns", damagingEntity: player });
            entity.addEffect("slowness", TicksPerSecond, { amplifier: 1, showParticles: false });
            entity.addEffect("weakness", TicksPerSecond, { amplifier: 1, showParticles: false });
        }
    }
}

function applyAuraDisplay(player) {
    if (!hasLoreInEquippedItem(player, 'aura of dread', EquipmentSlot.Head)) return;
    displayOnActionbar(player, '§r[§0Aura of Dread§r]', 40, 5);
}

toAllPlayers(applyAuraLogic, 1);
toAllPlayers(applyAuraDisplay, 10);

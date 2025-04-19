import { hasLoreInHeldItem, toAllPlayers } from '../../../utils/utils.js';

function applyForcefield(player) {
    if (!hasLoreInHeldItem(player, "sentinel")) return;  

    player.onScreenDisplay.setActionBar('§r[§sSentinel Active§r]');
    player.playSound('beacon.activate');

    const dimension = player.dimension;
    const origin = player.location;
    const radius = 12;

    const nearbyEntities = dimension.getEntities({
        location: origin,
        maxDistance: radius
    });

    for (const entity of nearbyEntities) {
      if(entity.typeId === "minecraft:item") continue;
      if(entity.typeId === "minecraft:xp_orb") continue;
      if(entity.id === player.id) continue;

        const directionX = entity.location.x - origin.x;
        const directionZ = entity.location.z - origin.z;
        const length = Math.sqrt(directionX ** 2 + directionZ ** 2);

        if (length === 0) continue;

        const knockX = directionX / length;
        const knockZ = directionZ / length;

        entity.applyKnockback(knockX, knockZ, 0.5, 0.2);
        entity.applyDamage(1, { cause:"suffocation", damagingEntity: player });

    }
}

toAllPlayers(applyForcefield, 5);

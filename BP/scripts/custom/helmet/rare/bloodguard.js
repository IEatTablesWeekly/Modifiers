import { world, EquipmentSlot, TicksPerSecond } from '@minecraft/server';
import { hasLoreInEquippedItem, toAllPlayers, displayOnActionbar } from '../../../utils/utils.js';

function tryApplyBloodguard(player) {
  if (!hasLoreInEquippedItem(player, 'bloodguard', EquipmentSlot.Head)) return;

  player.addEffect("regeneration", TicksPerSecond * 5, { amplifier: 0, showParticles: false });
  displayOnActionbar(player, '§r[§cBloodguard§r]', 40, 5)
}


world.afterEvents.entityHurt.subscribe(({ hurtEntity }) => {
    if (hurtEntity?.isValid() && hurtEntity.typeId === 'minecraft:player') {
        tryApplyBloodguard(hurtEntity);
    }
}
);
import { world, EquipmentSlot } from '@minecraft/server';
import { hasLoreInEquippedItem, displayOnActionbar } from '../../../utils/utils.js';

function tryApplySturdyLining(player) {
    if (!hasLoreInEquippedItem(player, 'sturdy lining', EquipmentSlot.Head)) return;
    if (Math.random > 0.2) return;
    const equippable = player.getComponent('minecraft:equippable');
    if (!equippable) return;

    const helmet = equippable.getEquipment(EquipmentSlot.Head);
    if (!helmet) return;

    const durability = helmet.getComponent('minecraft:durability');
    if (durability && durability.damage > 0) {
        const maxDurability = durability.maxDurability;
        const restoreAmount = Math.ceil(maxDurability * 0.01);
        durability.damage = Math.max(durability.damage - restoreAmount, 0);
        equippable.setEquipment(EquipmentSlot.Head, helmet);
        displayOnActionbar(player, '§r[§7Sturdy Lining§r]', 40, 5)
    }
}

world.afterEvents.entityHurt.subscribe(({ hurtEntity }) => {
    if (hurtEntity?.isValid() && hurtEntity.typeId === 'minecraft:player') {
        tryApplySturdyLining(hurtEntity);
    }
});


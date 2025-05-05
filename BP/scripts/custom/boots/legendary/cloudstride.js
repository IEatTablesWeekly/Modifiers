import { world, InputButton, ButtonState, system, EquipmentSlot } from "@minecraft/server";
import { hasLoreInEquippedItem, displayOnActionbar } from '../../../utils/utils.js';

const jumpCounts = new Map();

world.afterEvents.playerButtonInput.subscribe(event => {
  const player = event.player;
  const id = player.id;

  if (!hasLoreInEquippedItem(player, 'cloudstride', EquipmentSlot.Feet)) return;

  if (event.button === InputButton.Jump && event.newButtonState === ButtonState.Pressed) {
    let count = jumpCounts.get(id) ?? 0;

    if (count === 0) {
      jumpCounts.set(id, 1);
    } else if (count < 16) {
      const dir = player.getViewDirection();
      player.applyKnockback(dir.x, dir.z, 1.75, 0.7);
      displayOnActionbar(player, `[Cloudstride: §b${count}§r/§b15§r]`, 8, 8);
      jumpCounts.set(id, count + 1);
    }
  }
});

system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    if (!hasLoreInEquippedItem(player, 'cloudstride', EquipmentSlot.Feet)) continue;

    const id = player.id;
    if (player.isOnGround) {
      jumpCounts.set(id, 0);
    }
  }
}, 1);

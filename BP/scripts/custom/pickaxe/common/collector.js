import { world } from '@minecraft/server';
import { hasLoreInHeldItem } from '../../../utils/utils.js';

const oreBlocks = new Set([
    'minecraft:coal_ore',
    'minecraft:copper_ore',
    'minecraft:diamond_ore',
    'minecraft:emerald_ore',
    'minecraft:gold_ore',
    'minecraft:iron_ore',
    'minecraft:lapis_ore',
    'minecraft:nether_gold_ore',
    'minecraft:nether_quartz_ore',
    'minecraft:deepslate_coal_ore',
    'minecraft:deepslate_copper_ore',
    'minecraft:deepslate_diamond_ore',
    'minecraft:deepslate_emerald_ore',
    'minecraft:deepslate_gold_ore',
    'minecraft:deepslate_iron_ore',
    'minecraft:deepslate_lapis_ore'
]);

function tryApplyCollector(player, block) {
    if (!hasLoreInHeldItem(player, 'collector')) return;
    if (!oreBlocks.has(block.id)) return;

    const inventory = player.getComponent('minecraft:inventory')?.container;
    if (!inventory) return;

    const selectedSlot = player.selectedSlotIndex;

    const item = inventory.getItem(selectedSlot);
    const durability = item?.getComponent('minecraft:durability');

    if (durability && durability.damage > 0) {
        durability.damage = Math.max(durability.damage - 5, 0);

        inventory.setItem(selectedSlot, item);

        player.playSound('random.orb');
        player.onScreenDisplay.setActionBar('§r[§7Collector§r]');
    }
}

world.afterEvents.playerBreakBlock.subscribe(({ player, brokenBlockPermutation }) => {
    if (player?.isValid()) {
        const block = brokenBlockPermutation.type;
        tryApplyCollector(player, block);
    }
});

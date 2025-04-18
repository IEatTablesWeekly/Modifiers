// ../../../utils/utils.js
import { world , system } from '@minecraft/server';

/**
 * Checks if the item held in the player's main hand contains specific lore text.
 * 
 * @param {Player} player - The player entity to check.
 * @param {string} loreText - The text to search for within the item's lore.
 * @returns {boolean} - True if the held item contains the lore text; false otherwise.
 */
export function hasLoreInHeldItem(player, loreText) {
    if (!player || !player.isValid()) return false;

    const inventory = player.getComponent('minecraft:inventory')?.container;
    if (!inventory) return false;

    const selectedSlot = player.selectedSlotIndex;
    if (typeof selectedSlot !== 'number') return false;

    const item = inventory.getItem(selectedSlot);
    if (!item || typeof item.getLore !== 'function') return false;

    return item.getLore().some(line =>
        line.toLowerCase().includes(loreText.toLowerCase())
    );
}

/**
 * Executes a callback function for all players at a specified interval
 * @param {Function} callback - Function to execute for each player
 * @param {number} interval - Interval in ticks between executions
 */


export function toAllPlayers(callback, interval) {
    system.runInterval(() => {
        for (const player of world.getPlayers()) {
            callback(player);
        }
    }, interval);
}



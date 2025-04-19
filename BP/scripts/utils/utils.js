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

/**
 * Processes a player's inventory, modifying weapons with random abilities and rarities.
 *
 * @param {Player} player - The player whose inventory should be processed.
 * @param {string[]} weaponKeywords - Keywords to identify weapons in item typeIds.
 * @param {Object} abilitiesByRarity - Object mapping rarity keys to their corresponding abilities.
 */
export function processInventoryWithModifiers(player, weaponKeywords, abilitiesByRarity) {
    const RARITIES = {
        common: {
            chance: 40,
            color: "§r§7",
            displayName: " Common (40%)"
        },
        uncommon: {
            chance: 30,
            color: "§r§a",
            displayName: " Uncommon (30%)"
        },
        rare: {
            chance: 20,
            color: "§r§9",
            displayName: " Rare (20%)"
        },
        epic: {
            chance: 8,
            color: "§r§5",
            displayName: " Epic (8%)"
        },
        legendary: {
            chance: 2000,
            color: "§r§6",
            displayName: " Legendary (2%)"
        }
    };

    const getRandomRarity = () => {
        const total = Object.values(RARITIES).reduce((sum, r) => sum + r.chance, 0);
        let roll = Math.random() * total;

        for (const [key, rarity] of Object.entries(RARITIES)) {
            if (roll < rarity.chance) return { ...rarity, key };
            roll -= rarity.chance;
        }
        return { ...RARITIES.common, key: "common" };
    };

    try {
        const inventory = player.getComponent('minecraft:inventory')?.container;
        if (!inventory) return;

        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i);
            if (!item) continue;

            const id = item.typeId.toLowerCase();
            const isWeapon = weaponKeywords.some(keyword => id.includes(keyword));
            if (!isWeapon || item.getLore().length > 0) continue;

            let rarity;
            do {
                rarity = getRandomRarity();
            } while (
                (rarity.key === "legendary" || rarity.key === "epic") &&
                ["wooden", "stone", "gold", "iron"].some(material => id.includes(material))
            );

            const abilities = abilitiesByRarity[rarity.key];
            const ability = abilities[Math.floor(Math.random() * abilities.length)];

            try {
                item.setLore([
                    `${ability.color}${ability.name}`,
                    `§7${ability.description}`,
                    `${rarity.color}${rarity.displayName}`
                ]);

                const rawName = item.typeId.split(":")[1]?.replace(/_/g, " ") ?? "Weapon";
                const formattedName = rawName.replace(/\b\w/g, c => c.toUpperCase());
                item.nameTag = `${rarity.color}${formattedName}`;

                inventory.setItem(i, item);
            } catch (e) {
                console.error("[IEatTablesWeekly][V1.0 Modifiers] Error while setting item metadata:", e);
            }
        }
    } catch (err) {
        console.error("[IEatTablesWeekly][V1.0 Modifiers] Error while accessing inventory:", err);
    }
}





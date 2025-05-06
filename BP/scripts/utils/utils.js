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
            chance: 2,
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
                const typeIndicator = ability.type === "positive" ? "[§a+§7§o]" : "[§c-§7§o]";
                const rawName = item.typeId.split(":")[1]?.replace(/_/g, " ") ?? "Weapon";
                const formattedName = rawName.replace(/\b\w/g, c => c.toUpperCase());

                item.setLore([
                    `${ability.emoji} ${ability.color}${ability.name}`,
                    `§7 - ${typeIndicator} ${ability.description}`,
                    `${rarity.color}${rarity.displayName}`
                ]);

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



/**
 * Generates a random integer
 *
 * @param {number} min - The minimum integer to generate.
 * @param {number} max - The maximum integer to generate.
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  import { EquipmentSlot } from '@minecraft/server';

  /**
   * Checks if the equipped item in a specified slot contains a given lore text.
   *
   * @param {Entity} entity - The entity to inspect.
   * @param {string} loreText - The lore text to search for (case-insensitive).
   * @param {EquipmentSlot} slot - The equipment slot to check (e.g., EquipmentSlot.Head).
   * @returns {boolean} - True if the lore text is found; otherwise, false.
   */
  export function hasLoreInEquippedItem(entity, loreText, slot) {
      if (!entity?.isValid()) return false;
  
      const equippable = entity.getComponent('minecraft:equippable');
      if (!equippable) return false;
  
      try {
          const item = equippable.getEquipment(slot);
          if (!item) return false;
  
          const lore = item.getLore();
          if (!Array.isArray(lore)) return false;
  
          return lore.some(line => line.toLowerCase().includes(loreText.toLowerCase()));
      } catch (error) {
          console.warn(`Error accessing equipment slot '${slot}':`, error);
          return false;
      }
  }
/**
 * Extracts the first number found in an array of lore lines.
 * Iterates through each line of the `loreLines` array and returns the first number
 * found as an integer. If no number is found in any line, it returns null.
 *
 * @param {string[]} loreLines - An array of lore strings (e.g., from item descriptions).
 * @returns {number|null} The first number found, or null if no number exists.
 */
export function extractFirstNumberFromLore(loreLines) {
    for (const line of loreLines) {
        const match = line.match(/(\d+)/);
        if (match) {
            return parseInt(match[1]);
        }
    }
    return null;
}

  
  /**
   * Displays multiple messages in the actionbar at the same time, with priority.
   *
   * @param {Player} player - The player to show the actionbar to.
   * @param {string} message - The message to show.
   * @param {number} duration - Duration in ticks. (Default = 40 ticks)
   * @param {number} priority - Priority of the message. Higher shows at the top. (Default = 0)
   */

  const playerActionbars = new Map();
  const lastDisplayedText = new Map();

  export function displayOnActionbar(player, message, duration = 40, priority = 0) {
      if (!player || typeof message !== "string" || !message.trim()) return;
  
      const id = player.id;
      const currentTick = system.currentTick;
  
      if (!playerActionbars.has(id)) {
          playerActionbars.set(id, new Map());
      }
  
      const msgMap = playerActionbars.get(id);
  
      const existing = msgMap.get(message);
      if (!existing || existing.expireTick <= currentTick) {
          msgMap.set(message, {
              message,
              expireTick: currentTick + duration,
              timestamp: Date.now(),
              priority: priority
          });
      }
  }
  
  system.runInterval(() => {
      const currentTick = system.currentTick;
  
      for (const player of world.getPlayers()) {
          const id = player.id;
          const msgMap = playerActionbars.get(id) ?? new Map();
  
          const activeEntries = Array.from(msgMap.values())
          .filter(entry => entry.expireTick > currentTick)
          .sort((a, b) => {
              if (a.priority !== b.priority) {
                  return a.priority - b.priority;
              }
              return a.timestamp - b.timestamp;
          });
      
      const newText = activeEntries.map(e => e.message).join('\n');
          const lastText = lastDisplayedText.get(id) ?? "";
  
          if (newText !== lastText) {
              player.onScreenDisplay.setActionBar(newText);
              lastDisplayedText.set(id, newText);
          }
  
          const updatedMap = new Map();
          for (const entry of activeEntries) {
              updatedMap.set(entry.message, entry);
          }
          playerActionbars.set(id, updatedMap);
  
          if (activeEntries.length === 0 && lastText !== "") {
              player.onScreenDisplay.setActionBar("");
              lastDisplayedText.set(id, "");
          }
      }
  }, 1);
  
  




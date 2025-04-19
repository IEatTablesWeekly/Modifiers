import "./ability";
import { toAllPlayers } from "../../utils/utils";

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

const weaponKeywords = [
    "sword", "katana", "scimitar", "blade", "saber", "cutlass", "rapier", "edge", 
    "shortsword", "longsword", "broadsword", "claymore", "greatsword", 
    "falchion", "zweihander", "gladius", "spatha", "kurkri", "waraxe", "battleaxe", 
    "spike", "stiletto", "handaxe", "warpick", "cleaver", "scythe", "warfan", 
    "voulge", "tomahawk", "kris", "chokuto", "jambiya", "xiphos", "kopis", 
    "wakizashi", "tanto", "falcata", "balisong", "katanas", "nodachi", "tulwar", 
    "hooked blade", "longblade", "shortblade", "broadblade", "swordfish", "morningstar", 
    "katana blade", "kama", "swordbreaker", "rapierblade", "shamshir", "zhongdao","circus", 
    "cracker", "sord", "swrd"
];


const ABILITIES = {
    common: [
        { name: "Sharp", description: "- [§a+§7§o] Increases damage dealt to enemies by 10%.", color: "§r§r",},
        { name: "Reinforced", description: "- [§a+§7§o] 10% chance to regain lost durability on use.", color: "§r§7" },
        { name: "Swift", description: "- [§a+§7§o] Increases attack & mining speed when held.", color: "§r§a" },
        { name: "Dull", description: "- [§c-§7§o] Decreases damage dealt to enemies by 10%.", color: "§r§7" },
        { name: "Worn", description: "- [§c-§7§o] 10% chance to lose twice the durability on use.", color: "§r§7" },
        { name: "Heavy", description: "- [§c-§7§o] Decreases movement and mining speed drastically.", color: "§r§7" }
    ],
    uncommon: [
        { name: "Precise", description: "- [§a+§7§o] 10% chance to land a critical hit with 150% damage.", color: "§r§b" },
        { name: "Forceful", description: "- [§a+§7§o] Makes enemies take twice the amount of knockback.", color: "§r§7" },
        { name: "Lucky", description: "- [§a+§7§o] When you hit a mob, it has a low chance of dropping valuables.", color: "§r§g" },
        { name: "Cracked", description: "- [§c-§7§o] 20% chance to lose twice the durability on use.", color: "§r§c" },
        { name: "Unstable", description: "- [§c-§7§o] 0.1% chance for the item to randomly break when used.", color: "§r§8" },
        { name: "Feeble", description: "- [§c-§7§o] 10% chance to land a weak hit with 50% damage.", color: "§r§p" }
    ],
    rare: [
        { name: "Leeching", description: "- [§a+§7§o] 25% chance to regenerate a heart on use.", color: "§r§c" },
        { name: "Unbreakable", description: "- [§a+§7§o] This item is unbreakable and will never break.", color: "§r§9" },
        { name: "Flametongue", description: "- [§a+§7§o] 5% chance to drown the enemy in ephemeral lava.", color: "§r§v" },
        { name: "Silkbind", description: "- [§a+§7§o] 10% chance to entangle the enemy in ephemeral webs.", color: "§r" },
        { name: "Charged", description: "- [§a+§7§o] You gain Strength II when at full health.", color: "§r§u" },
        { name: "Ghostedge", description: "- [§a+§7§o] Unleash a delayed phantom hit that mimics your last attack.", color: "§r§a" },
        { name: "Cursed Handle", description: "- [§c-§7§o] 0.5% chance to mortally wound you when using the item.", color: "§r§u" },
        { name: "Brittle", description: "- [§c-§7§o] 1% chance for the item to randomly break when used.", color: "§r§7" },
        { name: "Backlash", description: "- [§c-§7§o] 15% chance to knock you away when using the item.", color: "§r§p" }
    ],
    epic: [
        { name: "Resilience", description: "- [§a+§7§o] Protects you from 40% of incoming damage when held.", color: "§r§8" },
        { name: "Stormcaller's Edge", description: "- [§a+§7§o] 50% chance to strike the enemy with the wrath of Zeus on use.", color: "§r§t" },
        { name: "Lifedrain", description: "- [§a+§7§o] 25% chance to steal a heart from the enemy.", color: "§r§4" },
        { name: "Galeblade", description: "- [§a+§7§o] 20% chance to knock the enemy high up in the wind.", color: "§r§q" },
        { name: "Bound to Darkness", description: "- [§c-§7§o] Channels the Strength of Darkness into user, causing loss of vision in exchange for power.", color: "§r§8" },
        { name: "Cacophony of Collapse", description: "- [§c-§7§o] Causes the user to get dizzy when item is held.", color: "§r§q" },
    ],
    legendary: [
        { name: "Excalibur", description: "- [§a+§7§o] Its divine power shreds through all defenses. This sword ignores armor.", color: "§r§u" },
        { name: "Aegis", description: "- [§a+§7§o] Creates a protective aura around the user,\n reflecting all damage and healing them significantly,\neffectively making them immortal.", color: "§r§q" },
        { name: "Timepiercer", description: "- [§a+§7§o] Attacks stop enemies in time, preventing them from moving or performing any action.", color: "§r§2" },
        { name: "Shadowstep", description: "- [§a+§7§o] Step into the shadow realm, manifesting yourself \nas a shadow of pure energy behind the enemy.", color: "§r§8" },
        { name: "Terra§qblitz", description: "- [§a+§7§o] Grants the user enhanced movement abilities \nto effortlessly traverse the terrain.\nSignificantly hinders nearby enemies when held.", color: "§n" },
        { name: "Windcutter", description: "- [§a+§7§o] Sends enemies flying through the wind using strong gale slashes.", color: "§r§a" },
        { name: "Sentinel", description: "- [§a+§7§o] Summons a vigilant forcefield that knocks enemies away with immense power.", color: "§r§s" }
    ]
};

function getRandomRarity() {
    const total = Object.values(RARITIES).reduce((sum, r) => sum + r.chance, 0);
    let roll = Math.random() * total;
    
    for (const [key, rarity] of Object.entries(RARITIES)) {
        if (roll < rarity.chance) return { ...rarity, key };
        roll -= rarity.chance;
    }
    return RARITIES.common;
}

function processPlayerInventory(player) { 
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

            const abilities = ABILITIES[rarity.key];
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
                console.warn("[IEatTablesWeekly][V1.0][Modifiers][While setting item metadata.]", e);
            }
            
        }
    } catch (err) {
        console.warn("[IEatTablesWeekly][V1.0][Modifiers][While processing player inventory]:", err);
    }
}


toAllPlayers(processPlayerInventory,20)
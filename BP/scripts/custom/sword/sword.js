import "./ability";
import { toAllPlayers, processInventoryWithModifiers } from "../../utils/utils";

const swordKeywords = [
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
        { name: "Sharp", description: "- [§a+§7§o] Increases damage dealt to enemies by 10%.", color: "§r§r"},
        { name: "Reinforced", description: "- [§a+§7§o] 10% chance to regain lost durability on use.", color: "§r§7"},
        { name: "Swift", description: "- [§a+§7§o] Increases attack & mining speed when held.", color: "§r§a"},
        { name: "Dull", description: "- [§c-§7§o] Decreases damage dealt to enemies by 10%.", color: "§r§7"},
        { name: "Worn", description: "- [§c-§7§o] 10% chance to lose twice the durability on use.", color: "§r§7"},
        { name: "Heavy", description: "- [§c-§7§o] Decreases movement and mining speed drastically.", color: "§r§7"}
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
        { name: "Terra§qblitz", description: "- [§a+§7§o] Grants the user enhanced movement abilities \nto effortlessly traverse the terrain.\nSignificantly hinders nearby enemies when held.", color: "§r§n" },
        { name: "Windcutter", description: "- [§a+§7§o] Sends enemies flying through the wind using strong gale slashes.", color: "§r§a" },
        { name: "Sentinel", description: "- [§a+§7§o] Summons a vigilant forcefield that knocks enemies away with immense power.", color: "§r§s" }
    ]
};

toAllPlayers(player => {
    processInventoryWithModifiers(player, swordKeywords, ABILITIES);
}, 20);


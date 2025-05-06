import "./ability";
import { toAllPlayers, processInventoryWithModifiers } from "../../utils/utils";

const swordKeywords = [
    "sword", "katana", "scimitar", "blade", "saber", "cutlass", "rapier", "edge", 
    "shortsword", "longsword", "broadsword", "claymore", "greatsword", 
    "falchion", "zweihander", "gladius", "spatha", "kurkri", "waraxe", "battleaxe", 
    "spike", "stiletto", "warpick", "cleaver", "scythe", "warfan", 
    "voulge", "tomahawk", "kris", "chokuto", "jambiya", "xiphos", "kopis", 
    "wakizashi", "tanto", "falcata", "balisong", "katanas", "nodachi", "tulwar", 
    "hooked blade", "longblade", "shortblade", "broadblade", "swordfish", "morningstar", 
    "katana blade", "kama", "swordbreaker", "rapierblade", "shamshir", "zhongdao","circus", 
    "cracker", "sord", "swrd"
];

const ABILITIES = {
    common: [
        { name: "Sharp", description: "Increases damage dealt to enemies by 10%.", emoji: "", type: "positive", color: "§r§r" },
        { name: "Reinforced", description: "10% chance to regain lost durability on use.", emoji: "", type: "positive", color: "§r§7" },
        { name: "Swift", description: "Increases attack & mining speed when held.", emoji: "", type: "positive", color: "§r§a" },
        { name: "Dull", description: "Decreases damage dealt to enemies by 10%.", emoji: "", type: "negative", color: "§r§7" },
        { name: "Worn", description: "10% chance to lose twice the durability on use.", emoji: "", type: "negative", color: "§r§7" },
        { name: "Heavy", description: "Decreases movement and mining speed drastically.", emoji: "", type: "negative", color: "§r§7" }
    ],
    uncommon: [
        { name: "Precise", description: "10% chance to land a critical hit with 150% damage.", emoji: "", type: "positive", color: "§r§b" },
        { name: "Forceful", description: "Makes enemies take twice the amount of knockback.", emoji: "", type: "positive", color: "§r§7" },
        { name: "Lucky", description: "When you hit a mob, it has a low chance of dropping valuables.", emoji: "", type: "positive", color: "§r§g" },
        { name: "Cracked", description: "20% chance to lose twice the durability on use.", emoji: "", type: "negative", color: "§r§c" },
        { name: "Unstable", description: "0.1% chance for the item to randomly break when used.", emoji: "", type: "negative", color: "§r§8" },
        { name: "Feeble", description: "10% chance to land a weak hit with 50% damage.", emoji: "", type: "negative", color: "§r§p" }
    ],
    rare: [
        { name: "Leeching", description: "25% chance to regenerate a heart on use.", emoji: "", type: "positive", color: "§r§c" },
        { name: "Unbreakable", description: "This item is unbreakable and will never break.", emoji: "", type: "positive", color: "§r§9" },
        { name: "Flametongue", description: "5% chance to drown the enemy in ephemeral lava.", emoji: "", type: "positive", color: "§r§v" },
        { name: "Silkbind", description: "10% chance to entangle the enemy in ephemeral webs.", emoji: "", type: "positive", color: "§r" },
        { name: "Charged", description: "You gain Strength II when at full health.", emoji: "", type: "positive", color: "§r§u" },
        { name: "Ghostedge", description: "Unleash a delayed phantom hit that mimics your last attack.", emoji: "", type: "positive", color: "§r§a" },
        { name: "Cursed Handle", description: "0.5% chance to mortally wound you when using the item.", emoji: "", type: "negative", color: "§r§u" },
        { name: "Brittle", description: "1% chance for the item to randomly break when used.", emoji: "", type: "negative", color: "§r§7" },
        { name: "Backlash", description: "15% chance to knock you away when using the item.", emoji: "", type: "negative", color: "§r§p" }
    ],
    epic: [
        { name: "Resilience", description: "Protects you from 40% of incoming damage when held.", emoji: "", type: "positive", color: "§r§8" },
        { name: "Stormcaller's Edge", description: "50% chance to strike the enemy with the wrath of Zeus on use.", emoji: "", type: "positive", color: "§r§t" },
        { name: "Lifedrain", description: "25% chance to steal a heart from the enemy.", emoji: "", type: "positive", color: "§r§4" },
        { name: "Galeblade", description: "20% chance to knock the enemy high up in the wind.", emoji: "", type: "positive", color: "§r§q" },
        { name: "Bound to Darkness", description: "Channels the Strength of Darkness into user, causing loss of vision in exchange for power.", emoji: "", type: "negative", color: "§r§8" },
        { name: "Cacophony of Collapse", description: "Causes the user to get dizzy when item is held.", emoji: "", type: "negative", color: "§r§q" }
    ],
    legendary: [
        { name: "Excalibur", description: "Its divine power shreds through all defenses. This sword ignores armor.", emoji: "", type: "positive", color: "§r§u" },
        { name: "Timepiercer", description: "Attacks stop enemies in time, preventing them from moving or performing any action.", emoji: "", type: "positive", color: "§r§2" },
        { name: "Shadowstep", description: "Step into the shadow realm, manifesting yourself as a shadow of pure energy behind the enemy.", emoji: "", type: "positive", color: "§r§8" },
        { name: "Terrablitz", description: "Grants the user enhanced movement abilities to effortlessly traverse the terrain. Significantly hinders nearby enemies when held.", emoji: "", type: "positive", color: "§r§n" },
        { name: "Windcutter", description: "Sends enemies flying through the wind using strong gale slashes.", emoji: "", type: "positive", color: "§r§a" },
        { name: "Sentinel", description: "Summons a vigilant forcefield that knocks enemies away with immense power.", emoji: "", type: "positive", color: "§r§s" }
    ]
};


toAllPlayers(player => {
    processInventoryWithModifiers(player, swordKeywords, ABILITIES);
}, 20);


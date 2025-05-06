import "./ability";
import { toAllPlayers, processInventoryWithModifiers } from "../../utils/utils";

const helmetKeywords = [
    "helmet", "mask", "head", "cap", "hat"
];

const ABILITIES = {
    common: [
        { name: "Sturdy Lining", description: "20% chance to ignore durability loss from damage.", type: "positive", color: "§r§7", emoji: "" },
        { name: "Foggy Mind", description: "Occasionally distorts your vision randomly.", type: "negative", color: "§r§7", emoji: "" },
    ],
    uncommon: [
        { name: "Focus", description: "Standing still grants Resistance II.", type: "positive", color: "§r§5", emoji: "" },
    ],
    rare: [
        { name: "Unbreakable", description: "This item is unbreakable and will never break.", type: "positive", color: "§r§9", emoji: "" },
        { name: "Dread Veil", description: "Occasionally blinds enemies who hit you.", type: "negative", color: "§r§8", emoji: "" },
        { name: "Bloodguard", description: "Gain brief regeneration after taking damage.", type: "positive", color: "§r§c", emoji: "" },
    ],
    epic: [
        { name: "Incandescent", description: "Helmet glows brightly, illuminating surroundings.", type: "positive", color: "§r§4", emoji: "" },
        { name: "Clear Sight", description: "Grants night vision in dark areas.", type: "positive", color: "§r§7", emoji: "" },
        { name: "Cleansing Veil", description: "Protects the user from all negative potion effects.", type: "positive", color: "§r§a", emoji: "" },
    ],
    legendary: [
        { name: "Propeller Hat", description: "You have a propeller on your hat, causing you to float when you look down and sneak.", type: "positive", color: "§r§b", emoji: "" },
        { name: "Aura of Dread", description: "Looking at an enemy will cause them to be frightened.", type: "positive", color: "§r§8", emoji: "" },
        { name: "Aegis", description: "Creates a protective aura around the user, reflecting all damage and healing them significantly, effectively making them immortal.", type: "positive", color: "§r§d", emoji: "" },
    ]
};

toAllPlayers(player => {
    processInventoryWithModifiers(player, helmetKeywords, ABILITIES);
}, 20);


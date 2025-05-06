import "./ability";
import { toAllPlayers, processInventoryWithModifiers } from "../../utils/utils";

const bootsKeywords = [
    "boots", "shoes", "shoe", "slippers",
    "sabattons", "sandals", "feet", "socks"
];

const ABILITIES = {
    common: [
        { name: "Sturdy Lining", description: "20% chance to ignore durability loss from damage.", type: "positive", color: "§r§7", emoji: "" },
        { name: "Heavy Soles", description: "You gain slowness while sprinting.", type: "negative", color: "§r§7", emoji: "" },
        { name: "Stonetread", description: "There are rocks in your shoes, causing you to randomly take damage while walking.", type: "negative", color: "§r§c", emoji: "" },
    ],
    uncommon: [
        { name: "Phasewalk", description: "You are able to walk through cobwebs without being slowed.", type: "positive", color: "§r§a", emoji: "" },
        { name: "Muddy Soles", description: "Walking on grass or grass-like blocks will make them dirty.", type: "positive", color: "§r§5", emoji: "" },
        { name: "Leadfoot", description: "Your boots are very dense, causing you to sink when in water.", type: "negative", color: "§r§9", emoji: "" },
    ],
    rare: [
        { name: "Feathersteps", description: "Reduces fall damage by 50% unless incoming damage is higher than your max health.", type: "positive", color: "§r§9", emoji: "" },
        { name: "Springheel", description: "You heels are made of springs, causing you to jump significantly higher.", type: "positive", color: "§r§7", emoji: "" },
        { name: "Unbreakable", description: "This item is unbreakable and will never break.", type: "positive", color: "§r§9", emoji: "" },
    ],
    epic: [
        { name: "Magmawalker", description: "Lava solidifies beneath your feet while walking on it.", type: "positive", color: "§r§4", emoji: "" },
        { name: "Blazing Dash", description: "Sprinting causes you to go extremely fast, lighting everything on fire, including yourself.", type: "positive", color: "§r§a", emoji: "" },
        { name: "Double Jump", description: "You are able to jump twice in the air.", type: "positive", color: "§r§a", emoji: "" },
    ],
    legendary: [
        { name: "Cloudstride", description: "You may jump as many times as you like in the air.", type: "positive", color: "§r§f", emoji: "" },
        { name: "Hermes' Blessing", description: "Your mobility is greatly increased, enhancing your movement ability.", type: "positive", color: "§r§8", emoji: "" },
        { name: "Momentum", description: "You gain speed progressively while sprinting.", type: "positive", color: "§r§a", emoji: "" },
    ]
};

toAllPlayers(player => {
    processInventoryWithModifiers(player, bootsKeywords, ABILITIES);
}, 20);
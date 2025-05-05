import "./ability";
import { toAllPlayers, processInventoryWithModifiers } from "../../utils/utils";

const bootsKeywords = [
    "boots", "shoes", "shoe", "slippers",
    "sabattons", "sandals", "feet", "socks"
];

const ABILITIES = {
  common: [
      { name: "Sturdy Lining", description: "- [§a+§7§o] 20% chance to ignore durability loss from damage.", color: "§r§7" },
      { name: "Heavy Soles", description: "- [§c-§7§o] You gain slowness while sprinting.", color: "§r§7" },
      { name: "Stonetread", description: "- [§a+§7§o] There are rocks in your shoes, causing you to randomly take damage while walking.", color: "§r§c" },
  ],
  uncommon: [
      { name: "Phasewalk", description: "- [§a+§7§o] You are able to walk through cobwebs without being slowed.", color: "§r§g" },
      { name: "Muddy Soles", description: "- [§a+§7§o] Walking on grass or grass-like blocks will make them dirty.", color: "§r§5" },
      { name: "Leadfoot", description: "- [§c-§7§o] Your boots are very dense, causing you to sink when in water..", color: "§r§9" },
  ],
  rare: [
      { name: "Feathersteps", description: "- [§a+§7§o] Reduces fall damage by 50% unless incoming damage is higher than your health.", color: "§r§9" },
      { name: "Springheel", description: "- [§a+§7§o] You heels are made of springs, causing you to jump significantly higher.", color: "§r§7" },
      { name: "Unbreakable", description: "- [§a+§7§o] This item is unbreakable and will never break.", color: "§r§9" },
  ],
  epic: [
      { name: "Magmawalker", description: "- [§a+§7§o] Lava solidifies beneath your feet while walking on it.", color: "§r§4" },
      { name: "Blazing Dash", description: "- [§a+§7§o] Sprinting causes you to go exteremly fast, lighting everything on fire, including yourself.", color: "§r§g" },
      { name: "Double Jump", description: "- [§a+§7§o] You are able to jump twice in the air.", color: "§r§g" },
  ],
  legendary: [
      { name: "Cloudstride", description: "- [§a+§7§o] You may jump as many times as you like in the air.", color: "§r" },
      { name: "Hermes' Blessing", description: "- [§a+§7§o] Your mobility is greatly increased, enhancing your movement ability.", color: "§r§8" },
      { name: "Momentum", description: "- [§a+§7§o] You gain speed progressively while sprinting.", color: "§r§g" },
  ]
};

toAllPlayers(player => {
    processInventoryWithModifiers(player, bootsKeywords, ABILITIES);
}, 20);
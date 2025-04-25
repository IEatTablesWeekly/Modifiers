import "./ability";
import { toAllPlayers, processInventoryWithModifiers } from "../../utils/utils";

const helmetKeywords = [
    "helmet", "mask", "head", "cap", "hat"
];

const ABILITIES = {
  common: [
      { name: "Sturdy Lining", description: "- [§a+§7§o] 20% chance to ignore durability loss from damage.", color: "§r§7" },
      { name: "Foggy Mind", description: "- [§c-§7§o] Occasionally distorts your vision randomly.", color: "§r§7" },
  ],
  uncommon: [
      { name: "Iron Mind", description: "- [§a+§7§o] 10% chance to resist negative potion effects.", color: "§r§g" },
      { name: "Panic", description: "- [§c-§7§o] Sprinting for too long causes confusion.", color: "§r§q" },
      { name: "Focus", description: "- [§a+§7§o] Standing still grants Resistance II.", color: "§r§5" },
  ],
  rare: [
      { name: "Unbreakable", description: "- [§a+§7§o] This item is unbreakable and will never break.", color: "§r§9" },
      { name: "Dread Veil", description: "- [§c-§7§o] Occasionally blinds enemies who hit you.", color: "§r§s" },
      { name: "Bloodguard", description: "- [§a+§7§o] Gain brief regeneration after taking critical damage.", color: "§r§r" }
  ],
  epic: [
      { name: "Mind Ward", description: "- [§a+§7§o] Immune to mind-altering effects (blindness, nausea).", color: "§r§b" },
      { name: "Incandescent", description: "- [§a+§7§o] Helmet glows brightly, illuminating surroundings.", color: "§r§4" },
      { name: "Clear Sight", description: "- [§a+§7§o] Grants night vision in dark areas.", color: "§r§7" },
      { name: "Cleansing Veil", description: "- [§a+§7§o] Protects the user from all negative potion effects.", color: "§r§g" },
  ],
  legendary: [
      { name: "Propeller Hat", description: "- [§a+§7§o] You have a properller on your hat, causing \nyou to float when you look down and sneak.", color: "§r" },
      { name: "Aura of Dread", description: "- [§a+§7§o] Looking at an enemy will cause them to be frightened.", color: "§r§8" },
      { name: "Aegis", description: "- [§a+§7§o] Creates a protective aura around the user,\n reflecting all damage and healing them significantly,\neffectively making them immortal.", color: "§r§q" },
  ]
};

toAllPlayers(player => {
    processInventoryWithModifiers(player, helmetKeywords, ABILITIES);
}, 20);


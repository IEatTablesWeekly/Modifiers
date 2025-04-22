import "./ability";
import { toAllPlayers, processInventoryWithModifiers } from "../../utils/utils";

const helmetKeywords = [
    "helmet", "mask", "head"
];

const ABILITIES = {
  common: [
      { name: "Sturdy Lining", description: "- [§a+§7§o] 20% chance to ignore durability loss from damage.", color: "§r§7" },
      { name: "Clear Sight", description: "- [§a+§7§o] Grants night vision in dark areas.", color: "§r§7" },
      { name: "Foggy Mind", description: "- [§c-§7§o] Occasionally distorts your vision randomly.", color: "§r§7" },
  ],
  uncommon: [
      { name: "Iron Mind", description: "- [§a+§7§o] 10% chance to resist negative potion effects.", color: "§r§g" },
      { name: "Panic", description: "- [§c-§7§o] Sprinting for too long causes confusion.", color: "§r§q" },
      { name: "Focus", description: "- [§a+§7§o] Standing still grants Resistance I.", color: "§r§5" },
  ],
  rare: [
      { name: "Echo", description: "- [§a+§7§o] Alerts you when mobs are nearby (auditory cue).", color: "§r§n" },
      { name: "Dread Veil", description: "- [§c-§7§o] Occasionally blinds enemies who hit you.", color: "§r§s" },
      { name: "Bloodguard", description: "- [§a+§7§o] Gain brief regeneration after taking critical damage.", color: "§r§r" }
  ],
  epic: [
      { name: "Mind Ward", description: "- [§a+§7§o] Immune to mind-altering effects (blindness, nausea).", color: "§r§b" },
      { name: "Incandescent", description: "- [§a+§7§o] Helmet glows brightly, illuminating surroundings.", color: "§r§4" },
      { name: "Titan's Gaze", description: "- [§a+§7§o] Grants a zoom-in (spyglass effect) toggle.", color: "§r§9" },
      { name: "Cursed Thoughts", description: "- [§c-§7§o] Occasionally whispers to the wearer, causing distraction.", color: "§r§8" },
  ],
  legendary: [
      { name: "Third Eye", description: "- [§a+§7§o] See invisible entities nearby.", color: "§r§e" },
      { name: "Aura of Dread", description: "- [§a+§7§o] Nearby enemies move slower when looking at you.", color: "§r§8" },
      { name: "Guardian's Helm", description: "- [§a+§7§o] Automatically blocks one fatal hit every 5 minutes.", color: "§r§n" },
  ]
};

toAllPlayers(player => {
    processInventoryWithModifiers(player, helmetKeywords, ABILITIES);
}, 20);


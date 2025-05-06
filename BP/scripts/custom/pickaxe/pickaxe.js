import "./ability";
import { toAllPlayers, processInventoryWithModifiers } from "../../utils/utils";

const pickaxeKeywords = [
    "pickaxe", "miner", "pick"
];

const ABILITIES = {
  common: [
      { name: "Sturdy", description: "20% chance to not consume durability.", type: "positive", color: "§r§7", emoji: "" },
      { name: "Collector", description: "You do not lose durability while mining ores.", type: "positive", color: "§r§7", emoji: "" },
      { name: "Exhaustion", description: "You randomly get exhausted, causing you to be unable to mine.", type: "negative", color: "§r§7", emoji: "" },
  ],
  uncommon: [
      { name: "Prospector", description: "10% chance to double common ore drops.", type: "positive", color: "§r§a", emoji: "" },
      { name: "Infested", description: "5% chance to spawn silverfish when mining stone.", type: "negative", color: "§r§c", emoji: "" },
      { name: "Jeweller", description: "Mining an ore gives you haste for 10 seconds.", type: "positive", color: "§r§d", emoji: "" },
  ],
  rare: [
      { name: "Earthshaker", description: "Mining damages and pushes back nearby enemies.", type: "positive", color: "§r§e", emoji: "" },
      { name: "Vein Miner", description: "Mining a single ore from a vein will break the entire vein.", type: "positive", color: "§r§b", emoji: "" },
      { name: "Glass Edge", description: "You mine 5× faster but consume 5× durability.", type: "negative", color: "§r§4", emoji: "" },
  ],
  epic: [
      { name: "Magnetized", description: "Automatically pulls mined ores near you.", type: "positive", color: "§r§3", emoji: "" },
      { name: "Volcanic", description: "Smelts ores directly when mined.", type: "positive", color: "§r§6", emoji: "" },
      { name: "Unbreakable", description: "This item is unbreakable and will never break.", type: "positive", color: "§r§9", emoji: "" },
      { name: "Claustrophobic", description: "Mining in tight spaces will cause you to hallucinate.", type: "negative", color: "§r§8", emoji: "" },
  ],
  legendary: [
      { name: "Midas Touch", description: "25% chance of getting random ores from mining stone.", type: "positive", color: "§r§6", emoji: "" },
      { name: "Worldrender", description: "Your mining speed is greatly enhanced.", type: "positive", color: "§r§5", emoji: "" },
      { name: "Seismic", description: "Causes seismic waves when you mine, increasing mining radius. Sneak to disable.", type: "positive", color: "§r§c", emoji: "" },
  ]
};

toAllPlayers(player => {
    processInventoryWithModifiers(player, pickaxeKeywords, ABILITIES);
}, 20);


// import "./ability";
import { toAllPlayers, processInventoryWithModifiers } from "../../utils/utils";

const pickaxeKeywords = [
    "pickaxe", "miner", "pick"
];


const ABILITIES = {
    common: [
        { name: "Sturdy", description: "- [§a+§7§o] 20% chance to not consume durability.", color: "§r§a" },
        { name: "Collector", description: "- [§a+§7§o] You do not lose durability while mining ores.", color: "§r§a" },
        { name: "Exhaustion", description: "- [§c-§7§o] You randomly get exhausted, causing you to be enable to mine.", color: "§r§3" },
    ],
    uncommon: [
      { name: "Prospector", description: "- [§a+§7§o] 10% chance to double common ore drops.", color: "§r§6" },
      { name: "Infested", description: "- [§c-§7§o] 5% chance to spawn silverfish when mining stone.", color: "§r§8" },
      { name: "Jeweller", description: "- [§c+§7§o] Mining an ore will give you haste for 10 seconds.", color: "§r§8" },
    ],
    rare: [
        { name: "Earthshaker", description: "- [§a+§7§o] Mining damages and pushes back nearby enemies.", color: "§r§6" },
        { name: "Vein Miner", description: "- [§c-§7§o] Mining a single ore from a vein will break the entire vein.", color: "§r§3" },
        { name: "Glass Edge", description: "- [§c-§7§o] You mine 5x faster but consume 5x durability.", color: "§r§3" }
      ],
    epic: [
        { name: "Magnetized", description: "- [§a+§7§o] Automatically pulls mined ores near you.", color: "§r§b" },
        { name: "Seismic", description: "- [§a+§7§o] Mines in a 3x3 radius.", color: "§r§b" },
        { name: "Volcanic", description: "- [§a+§7§o] Smelts ores directly when mined.", color: "§r§4" },
        { name: "Unbreakable", description: "- [§a+§7§o] This item is unbreakable and will never break.", color: "§r§9" },
        { name: "Claustrophobic", description: "- [§c-§7§o] Mining in tight spaces will make you dizzy.", color: "§r§8" },
    ],
    legendary: [
      { name: "Midas Touch", description: "- [§a+§7§o] 25% of getting random ores from mining stone.", color: "§r§6" },
      { name: "X-ray", description: "- [§a+§7§o] The location of nearby ores will be displayed on your screen.", color: "§r§9" },
      { name: "Voidhandle", description: "- [§a+§7§o] You break hard blocks like obsidian, reinforced deepslate and bedrock with ease.", color: "§r§9" },
      { name: "Marble Touch", description: "- [§a+§7§o] Blocks you break will not transform into another form upon dropping", color: "§r§9" },
    ]
};

toAllPlayers(player => {
    processInventoryWithModifiers(player, pickaxeKeywords, ABILITIES);
}, 20);


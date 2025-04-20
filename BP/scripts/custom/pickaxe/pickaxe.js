import "./ability";
import { toAllPlayers, processInventoryWithModifiers } from "../../utils/utils";

const pickaxeKeywords = [
    "pickaxe", "miner", "pick"
];


const ABILITIES = {
    common: [
        { name: "Sturdy", description: "- [§a+§7§o] 20% chance to not consume durability.", color: "§r§7" },
        { name: "Collector", description: "- [§a+§7§o] You do not lose durability while mining ores.", color: "§r§7" },
        { name: "Exhaustion", description: "- [§c-§7§o] You randomly get exhausted, causing you to be enable to mine.", color: "§r§7" },
    ],
    uncommon: [
      { name: "Prospector", description: "- [§a+§7§o] 10% chance to double common ore drops.", color: "§r§g" },
      { name: "Infested", description: "- [§c-§7§o] 5% chance to spawn silverfish when mining stone.", color: "§r§q" },
      { name: "Jeweller", description: "- [§c+§7§o] Mining an ore will give you haste for 10 seconds.", color: "§r§5" },
    ],
    rare: [
        { name: "Earthshaker", description: "- [§a+§7§o] Mining damages and pushes back nearby enemies.", color: "§r§n" },
        { name: "Vein Miner", description: "- [§a+§7§o] Mining a single ore from a vein will break the entire vein.", color: "§r§s" },
        { name: "Glass Edge", description: "- [§c-§7§o] You mine 5x faster but consume 5x durability.", color: "§r§r" }
      ],
    epic: [
        { name: "Magnetized", description: "- [§a+§7§o] Automatically pulls mined ores near you.", color: "§r§b" },
        { name: "Volcanic", description: "- [§a+§7§o] Smelts ores directly when mined.", color: "§r§4" },
        { name: "Unbreakable", description: "- [§a+§7§o] This item is unbreakable and will never break.", color: "§r§9" },
        { name: "Claustrophobic", description: "- [§c-§7§o] Mining in tight spaces will make you dizzy.", color: "§r§8" },
    ],
    legendary: [
      { name: "Midas Touch", description: "- [§a+§7§o] 25% of getting random ores from mining stone.", color: "§r§e" },
      { name: "Worldrender", description: "- [§a+§7§o] Your mining speed is greatly enhanced, making you mine blocks faster.", color: "§r§8" },
      { name: "Ceramic Touch", description: "- [§a+§7§o] Blocks you break will not transform into another form upon dropping", color: "§r§m" },
      { name: "Seismic", description: "- [§a+§7§o] Causes seismic waves when you mine, leading to an increased mine radius. Sneak to disable", color: "§r§n" },
    ]
};

toAllPlayers(player => {
    processInventoryWithModifiers(player, pickaxeKeywords, ABILITIES);
}, 20);


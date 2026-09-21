import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { type CardRarity } from '../types.js';

type colorType = "text" | "variable" | "error"

const themeColors = {
    text: "#5865F2",
    variable: "#ff624d",
    error: "#f5426c"
};

export const getThemeColor = (color: colorType) => Number(`0x${themeColors[color].substring(1)}`)

const rarityColors = {
    common: "#A0A0A0",
    uncommon: "#85E385", 
    rare: "#7CA6F8",     
    epic: "#C28BE0",     
    legendary: "#FFC266",
    mythical: "#FF7B7B"  
};

export const getRarityColor = (rarity: CardRarity) => Number(`0x${rarityColors[rarity].substring(1)}`)

export function getDirname(metaUrl: string): string {
  return dirname(fileURLToPath(metaUrl));
}
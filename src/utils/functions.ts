import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

type colorType = "text" | "variable" | "error"

const themeColors = {
    text: "#5865F2",
    variable: "#ff624d",
    error: "#f5426c"
};

export const getThemeColor = (color: colorType) => Number(`0x${themeColors[color].substring(1)}`)

export function getDirname(metaUrl: string): string {
  return dirname(fileURLToPath(metaUrl));
}
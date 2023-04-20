import colors from "tailwindcss/colors";

export const hexToRgb = (hex: string): number[] => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const [, r, g, b] = result;
    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
  } else {
    throw new Error(`Invalid hex color value: ${hex}`);
  }
};
export const moodColorArr = [
  colors.red[500],
  colors.amber[500],
  colors.yellow[300],
  colors.lime[300],
  colors.green[600],
].map((hex) => hexToRgb(hex));

export const pickFromGradient = (value: number): string => {
  if (value <= 0) {
    return `rgb(${moodColorArr[0].join(", ")})`;
  } else if (value >= 1) {
    return `rgb(${moodColorArr[2].join(", ")})`;
  } else {
    const index = Math.floor(value * (moodColorArr.length - 1));
    const [r1, g1, b1] = moodColorArr[index];
    const [r2, g2, b2] = moodColorArr[index + 1];
    const ratio = value * (moodColorArr.length - 1) - index;
    const r = Math.round(r1 + ratio * (r2 - r1));
    const g = Math.round(g1 + ratio * (g2 - g1));
    const b = Math.round(b1 + ratio * (b2 - b1));
    return `rgb(${r}, ${g}, ${b})`;
  }
};

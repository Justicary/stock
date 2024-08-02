import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const coloresBase = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

// Este objeto contiene en sus keys las tonalidades para el tema claro y en sus values el tono correspondiente para el tema oscuro.
const mapeoTonos = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

const generaObjetoTema = (colores: any, mapeos: any, invertir = false) => {
  const tema: any = {};
  coloresBase.forEach((color) => {
    tema[color] = {};
    Object.entries(mapeos).forEach(([key, value]: any) => {
      const tonoKey = invertir ? value : key;
      tema[color][key] = colores[color][tonoKey];
    });
  });
  return tema;
};

const temaClaro = generaObjetoTema(colors, mapeoTonos);
const temaOscuro = generaObjetoTema(colors, mapeoTonos, true);

const temas = {
  light: {
    ...temaClaro,
    white: "#ffffff",
  },
  dark: {
    ...temaOscuro,
    white: colors.gray["950"],
    black: colors.gray["50"],
  },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [createThemes(temas)],
};
export default config;

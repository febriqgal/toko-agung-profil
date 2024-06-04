import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              "50": "#f3f8f7",
              "100": "#e0eded",
              "200": "#c1dcdc",
              "300": "#9ac6c6",
              "400": "#6aa4a6",
              "500": "#4e898c",
              "600": "#447176",
              "700": "#3c5e62",
              "800": "#374f53",
              "900": "#314448",
              DEFAULT: "#6aa4a6",
            },
          },
        },
      },
    }),
  ],
};
export default config;

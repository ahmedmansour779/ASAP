import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
      },
      container: {
        padding: "1rem",
        center: true,
      },
      colors: {
        primary: {
          main: "#BA0000",
          light: "#BA0000A8",
          lighter: "#BA000014",
          text: "#303030",
          border: "#F1F1F1",
          white: "#ffffff",
          danger: "#FF5656",
        },
        secondary: {
          main: "#EFEFEF",
          dark: "#DCDCDC",
          darker: "#C5C5C5",
        },
      },
      keyframes: {
        "show-menu": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
      animation: {
        "show-menu": "show-menu .2s ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;

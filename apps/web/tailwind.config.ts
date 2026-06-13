import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import daisyuiThemes from "daisyui/src/theming/themes";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    fontFamily: {
      sans: ['"Lexend Deca"', "sans-serif"],
      "instrument-sans": ['"Lexend Deca"', "sans-serif"],
    },
    extend: {
      boxShadow: {
        solid: "0px 3px 0 0 var(--base-500)",
      },
      colors: {
        "base-400": "var(--base-400)",
        "base-500": "var(--base-500)",
        "diff-beginner": "var(--diff-beginner)",
        "diff-easy": "var(--diff-easy)",
        "diff-medium": "var(--diff-medium)",
        "diff-hard": "var(--diff-hard)",
      },
    },
  },

  plugins: [typography, forms, containerQueries, daisyui],

  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes["retro"],
          "base-100": "oklch(0.94 0.07 139.44)",
          "base-200": "oklch(0.88 0.0877 139.44)",
          "base-300": "oklch(0.76 0.12 139.44)",
          "base-content": "oklch(0.2719 0.027 30.15)",
          primary: "oklch(0.4 0.08 160)",
          "primary-content": "oklch(0.907 0.0132 71.32)",
          secondary: "oklch(0.8 0.07 50)",
          "secondary-content": "oklch(98% 0.01 50)",
          accent: "oklch(65% 0.25 160)",
          "accent-content": "oklch(98% 0.01 160)",
          neutral: "oklch(50% 0.05 240)",
          "neutral-content": "oklch(98% 0.01 240)",
          info: "oklch(70% 0.2 220)",
          "info-content": "oklch(98% 0.01 220)",
          success: "oklch(65% 0.25 140)",
          "success-content": "oklch(98% 0.01 140)",
          warning: "oklch(80% 0.25 80)",
          "warning-content": "oklch(20% 0.05 80)",
          error: "oklch(0.60 0.21 24)",
          "error-content": "oklch(98% 0.01 24)",
          "--diff-beginner": "#8cd5fa",
          "--diff-easy": "#75c060",
          "--diff-medium": "#deb475",
          "--diff-hard": "#dd534e",
          "--rounded-box": "0.5rem",
        },
      },
      {
        dark: {
          primary: "#6ea84f",
          secondary: "#65ac69",
          accent: "#49d9b1",
          neutral: "#020405",
          "base-100": "#1a1b1e",
          "base-200": "#14151a",
          "base-300": "#090b15",
          "--base-400": "#040716",
          "--base-500": "#010108",
          info: "#5fc4e9",
          success: "#b3f550",
          warning: "#ea9545",
          error: "#dc5551",
          "--diff-beginner": "#64a7ca",
          "--diff-easy": "#4f9840",
          "--diff-medium": "#ae6e24",
          "--diff-hard": "#ad3b3d",
          "--rounded-box": "0.5rem",
        },
      },

      /*
      daisyui: {
        themes: [
          {
            light: {
              "base-100": "oklch(0.89 0.08 139.44)",
              "base-200": "oklch(0.8522 0.05 139.44)",
              "base-300": "oklch(0.71 0.12 139.44)",
              "base-content": "oklch(0.2719 0.027 30.15)",
              primary: "oklch(55% 0.3 240)",
              "primary-content": "oklch(98% 0.01 240)",
              secondary: "oklch(70% 0.25 200)",
              "secondary-content": "oklch(98% 0.01 200)",
              accent: "oklch(65% 0.25 160)",
              "accent-content": "oklch(98% 0.01 160)",
              neutral: "oklch(50% 0.05 240)",
              "neutral-content": "oklch(98% 0.01 240)",
              info: "oklch(70% 0.2 220)",
              "info-content": "oklch(98% 0.01 220)",
              success: "oklch(65% 0.25 140)",
              "success-content": "oklch(98% 0.01 140)",
              warning: "oklch(80% 0.25 80)",
              "warning-content": "oklch(20% 0.05 80)",
              error: "oklch(65% 0.3 30)",
              "error-content": "oklch(98% 0.01 30)",

              "--diff-beginner": "#8cd5fa",
              "--diff-easy": "#a1d593",
              "--diff-medium": "#deb475",
              "--diff-hard": "#dd534e",
              "--rounded-box": "0.5rem",
            },
          },
          {
            dark: {
              primary: "#6ea84f",
              secondary: "#65ac69",
              accent: "#49d9b1",
              neutral: "#020405",
              "base-100": "#1a1b1e",
              "base-200": "#14151a",
              "base-300": "#090b15",
              "--base-400": "#040716",
              "--base-500": "#010108",
              info: "#5fc4e9",
              success: "#b3f550",
              warning: "#ea9545",
              error: "#dc5551",
              "--diff-beginner": "#64a7ca",
              "--diff-easy": "#4f9840",
              "--diff-medium": "#ae6e24",
              "--diff-hard": "#ad3b3d",
              "--rounded-box": "0.5rem",
            },
          },
        ],
      },
      */
    ],
  },
} satisfies Config;

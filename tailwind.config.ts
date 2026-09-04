import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f8f5f2",
          100: "#eee7df",
          500: "#7d5a45",
          600: "#684938",
          700: "#51372b",
          900: "#2f211b"
        }
      }
    }
  },
  plugins: []
};

export default config;
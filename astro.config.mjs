import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kokoatelier.ie",
  trailingSlash: "always",
  integrations: [react(), tailwind()]
});
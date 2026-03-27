// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://Almogod.github.io",
  base: "/PCAcademy-",
  integrations: [
    tailwind(),
    react(),
  ],

  devToolbar: {
    enabled: false,
  },

  server: {
    allowedHosts: true,
    host: true,
  },
});

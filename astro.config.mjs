// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: "server",
  adapter: netlify(),

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

  security: {
    checkOrigin: false,
  },
});

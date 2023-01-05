import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
      jsxRuntime: "classic",
    }),
  ],
  server: { port: 3000 },
});

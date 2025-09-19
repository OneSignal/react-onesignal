import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    port: 4001,
    open: true,
  },
});

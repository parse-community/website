import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin to copy 404.html for GitHub Pages SPA routing
function copy404Plugin() {
  return {
    name: 'copy-404',
    closeBundle() {
      const src = path.resolve(__dirname, 'client', '404.html');
      const dest = path.resolve(__dirname, 'dist', 'public', '404.html');
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log('✓ Copied 404.html for GitHub Pages SPA routing');
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    copy404Plugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  base: '/',
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

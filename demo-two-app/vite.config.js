import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [
    federation({
      filename: "remoteEntry.js",
      name: "demoTwoApp",
      exposes: {
        "./DemoTwoCanvas": "./src/components/DemoTwoCanvas.vue",
        "./demoTwoLogic": "./src/fabric/demoTwo.js",
      },
      remotes: {
        shellApp: {
          type: "module",
          name: "shellApp",
          entry: process.env.VITE_SHELL_REMOTE_ENTRY || "http://localhost:3000/remoteEntry.js",
          entryGlobalName: "shellApp",
          shareScope: "default",
        },
      },
      shared: {
        vue: { singleton: true }
      }
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // Removed vue alias - let Vite resolve from workspace root
    }
  },
  build: {
    target: "chrome89",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/style.css'
          }
          return 'assets/[name].[hash].[ext]'
        }
      },
    },
  },
  server: {
    port: 3002,
    cors: true,
    fs: { 
      allow: ["..", "."] // Allow access to parent directory for workspaces
    }
  },
  preview: {
    port: 3002,
    cors: true
  }
});
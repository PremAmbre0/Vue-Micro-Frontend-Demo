import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import path from 'path';

export default defineConfig({
  base: "/",
  plugins: [
    federation({
      name: "shellApp",
      remotes: {
        demoOneApp: {
          type: "module",
          name: "demoOneApp",
          entry: process.env.VITE_DEMO_ONE_REMOTE_ENTRY || "http://localhost:3001/remoteEntry.js",
          entryGlobalName: "demoOneApp",
          shareScope: "default",
        },
        demoTwoApp: {
          type: "module",
          name: "demoTwoApp",
          entry: process.env.VITE_DEMO_TWO_REMOTE_ENTRY || "http://localhost:3002/remoteEntry.js",
          entryGlobalName: "demoTwoApp",
          shareScope: "default",
        },
        demoThreeApp: {
          type: "module",
          name: "demoThreeApp",
          entry: process.env.VITE_DEMO_THREE_REMOTE_ENTRY || "http://localhost:3003/remoteEntry.js",
          entryGlobalName: "demoThreeApp",
          shareScope: "default",
        },
      },
      exposes: {
        "./useToast": "./src/composables/useToastComposable.js",
        "./commonStore": "./src/stores/common.store.js",
      },
      filename: "remoteEntry.js",
      shared: {
        vue: { singleton: true }
      }
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Fix: Use relative path to root node_modules for workspaces
      vue: path.resolve(__dirname, '../node_modules/vue/dist/vue.runtime.esm-bundler.js')
    }
  },
  build: {
    target: "chrome89",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'style.css'
          }
          return assetInfo.name
        }
      }
    }
  },
  server: {
    port: 3000,
    cors: true,
    fs: {
      allow: ["..", "."] // Allow access to parent directory (root)
    }
  }
});
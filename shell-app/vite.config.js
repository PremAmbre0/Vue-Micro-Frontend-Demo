import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";

export default defineConfig({
  base: "/", // Use root path instead of full URL
  plugins: [
    federation({
      name: "shellApp",
      remotes: {
        testApp: {
          type: "module",
          name: "testApp",
          entry: process.env.VITE_TEST_REMOTE_ENTRY || "http://localhost:3001/remoteEntry.js",
          entryGlobalName: "testApp",
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
      vue: fileURLToPath(new URL('./node_modules/vue/dist/vue.runtime.esm-bundler.js', import.meta.url))
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
      allow: ["."]
    }
  }
});
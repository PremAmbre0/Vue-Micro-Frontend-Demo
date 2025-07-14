import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    federation({
      name: "shellApp",
      remotes: {
        testApp: {
          type: "module",
          name: "testApp",
          entry: "http://localhost:3001/remoteEntry.js",
          entryGlobalName: "testApp",
          shareScope: "default",
        },
      },
      exposes: {
        "./useToast": "./src/composables/useToastComposable.js",
        "./commonStore": "./src/stores/common.store.js",
      },
      filename: "remoteEntry.js",
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
  },
  server: {
    port: 3000,
    cors: true,
    fs: {
      allow: ["."]
    }
  }
});
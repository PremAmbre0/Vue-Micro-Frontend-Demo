import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";

export default defineConfig({
  base: "http://localhost:3001/",
  plugins: [
    federation({
      filename: "remoteEntry.js",
      name: "testApp",
      exposes: {
        "./App": "./src/FederatedApp.vue",
        "./Counter": "./src/components/Counter.vue",
      },
      remotes: {
        shellApp: {
          type: "module",
          name: "shellApp",
          entry: "http://localhost:3000/remoteEntry.js",
          entryGlobalName: "shellApp",
          shareScope: "default",
        },
      },
      shared: {
        vue: {
          singleton: true,
        }
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
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/assets/scss/variables" as *; @use "@/assets/scss/mixins" as *;`,
      },
    },
  },
  build: {
    target: "chrome89",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // Ensure CSS is included in the main bundle
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/[name].[hash].css'
          }
          return 'assets/[name].[hash].[ext]'
        }
      },
      external: [],
    },
  },
  server: {
    port: 3001,
    cors: true,
    fs: {
      allow: ["."]
    }
  },
  preview: {
    port: 3001,
    cors: true
  }
});
import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [
    federation({
      filename: "remoteEntry.js",
      name: "demoOneApp",
      exposes: {
        "./DemoOneCanvas": "./src/components/DemoOneCanvas.vue",
        "./demoOneLogic": "./src/fabric/demoOne.js",
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

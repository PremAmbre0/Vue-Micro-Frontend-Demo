import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: "/",
    plugins: [
      vue(),
      federation({
        name: "shellApp",
        remotes: {
          demoOneApp: {
            type: "module",
            name: "demoOneApp",
            entry: env.VITE_DEMO_ONE_REMOTE_ENTRY || "http://localhost:3001/remoteEntry.js",
            entryGlobalName: "demoOneApp",
            shareScope: "default",
          },
          demoTwoApp: {
            type: "module",
            name: "demoTwoApp",
            entry: env.VITE_DEMO_TWO_REMOTE_ENTRY || "http://localhost:3002/remoteEntry.js",
            entryGlobalName: "demoTwoApp",
            shareScope: "default",
          },
          demoThreeApp: {
            type: "module",
            name: "demoThreeApp",
            entry: env.VITE_DEMO_THREE_REMOTE_ENTRY || "http://localhost:3003/remoteEntry.js",
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
          // vue: { singleton: true },
          // fabric: { singleton: true }
        }
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    optimizeDeps: {
      include: ['fabric']
    },
    build: {
      target: "chrome89",
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'style.css'
            }
            return assetInfo.name
          }
        }
      }
    },
    server: {
      port: parseInt(env.VITE_SHELL_PORT) || 3000,
      cors: true,
      fs: {
        allow: ["..", "."]
      }
    },
    preview: {
      port: parseInt(env.VITE_SHELL_PORT) || 3000,
      cors: true
    }
  }
});
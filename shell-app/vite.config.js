import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
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
          demoCounterApp: {
            type: "module",
            name: "demoCounterApp",
            entry: env.VITE_DEMO_COUNTER_REMOTE_ENTRY || "http://localhost:3004/remoteEntry.js",
            entryGlobalName: "demoCounterApp",
            shareScope: "default",
          },
        },
        exposes: {
          "./interfaces": "./src/interfaces/index.js",
          "./counterInterface": "./src/interfaces/counter.js",
        },
        filename: "remoteEntry.js",
        shared: {
          vue: {
            singleton: true,
            requiredVersion: "^3.5.18"
          },
          "vue-router": {
            singleton: true,
            requiredVersion: "^4.2.4"
          },
          pinia: {
            singleton: true,
            requiredVersion: "^2.1.7"
          },
          fabric: {
            singleton: true,
            requiredVersion: "^5.3.0"
          }
        }
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    optimizeDeps: {
      include: ['fabric', 'vue', 'vue-router', 'pinia']
    },
    build: {
      outDir: "dist",
      target: "chrome89",
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
          assetFileNames: (assetInfo) => {
            if (assetInfo.fileName && assetInfo.fileName.endsWith('.css')) {
              return 'style.css'
            }
            return '[name].[hash].[ext]'
          }
        }
      }
    },
    server: {
      port: parseInt(env.VITE_SHELL_PORT) || 3000,
      cors: true,
      fs: {
        allow: ["..", "."]
      },
      allowedHosts: true,
    },
    preview: {
      port: parseInt(env.VITE_SHELL_PORT) || 3000,
      cors: true,
    }
  }
});
import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import {
  loadMicroFrontendEnv,
  getSharedDependencies,
  getBuildConfig,
  getServerConfig
} from "../shared/vite-env-config.js";

export default defineConfig(({ mode }) => {
  // Load environment configuration
  const { env, isDevelopment, isProduction, defaultUrls, getRemoteEntry } =
    loadMicroFrontendEnv(mode, 'Shell App')

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
            entry: getRemoteEntry('VITE_DEMO_ONE_REMOTE_ENTRY', defaultUrls.demoOne),
            entryGlobalName: "demoOneApp",
            shareScope: "default",
          },
          demoTwoApp: {
            type: "module",
            name: "demoTwoApp",
            entry: getRemoteEntry('VITE_DEMO_TWO_REMOTE_ENTRY', defaultUrls.demoTwo),
            entryGlobalName: "demoTwoApp",
            shareScope: "default",
          },
          demoThreeApp: {
            type: "module",
            name: "demoThreeApp",
            entry: getRemoteEntry('VITE_DEMO_THREE_REMOTE_ENTRY', defaultUrls.demoThree),
            entryGlobalName: "demoThreeApp",
            shareScope: "default",
          },
          demoCounterApp: {
            type: "module",
            name: "demoCounterApp",
            entry: getRemoteEntry('VITE_DEMO_COUNTER_REMOTE_ENTRY', defaultUrls.demoCounter),
            entryGlobalName: "demoCounterApp",
            shareScope: "default",
          },
        },
        exposes: {
          "./interfaces": "./src/interfaces/index.js",
          "./counterInterface": "./src/interfaces/counter.js",
        },
        filename: "remoteEntry.js",
        shared: getSharedDependencies(true)
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
      },
      allowedHosts: true,
    },
    preview: {
      port: parseInt(env.VITE_SHELL_PORT) || 3000,
      cors: true,
    }
  }
});
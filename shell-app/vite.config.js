import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Try to load environment variables from root directory first (for development/sandbox)
  // Then fallback to current directory (for Vercel deployment)
  let env = loadEnv(mode, '../', '')

  // If no environment variables found, try loading from current directory
  if (!env.VITE_SHELL_PORT) {
    env = loadEnv(mode, './', '')
  }

  // Validate required environment variables
  const requiredEnvVars = [
    'VITE_DEMO_ONE_REMOTE_ENTRY',
    'VITE_DEMO_TWO_REMOTE_ENTRY',
    'VITE_DEMO_THREE_REMOTE_ENTRY',
    'VITE_DEMO_COUNTER_REMOTE_ENTRY',
    'VITE_SHELL_PORT'
  ]

  const missingVars = requiredEnvVars.filter(varName => !env[varName])
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}. Please check your .env.local or .env.production file.`)
  }

  // Use environment variables for all remote entries
  const demoOneRemoteEntry = env.VITE_DEMO_ONE_REMOTE_ENTRY
  const demoTwoRemoteEntry = env.VITE_DEMO_TWO_REMOTE_ENTRY
  const demoThreeRemoteEntry = env.VITE_DEMO_THREE_REMOTE_ENTRY
  const demoCounterRemoteEntry = env.VITE_DEMO_COUNTER_REMOTE_ENTRY

  // Define CSS URLs for environment variables
  // These will be available as import.meta.env.VITE_* in the client code
  // If not set in .env files, fallback logic is handled in main.js
  process.env.VITE_DEMO_ONE_CSS_URL = env.VITE_DEMO_ONE_CSS_URL
  process.env.VITE_DEMO_TWO_CSS_URL = env.VITE_DEMO_TWO_CSS_URL
  process.env.VITE_DEMO_THREE_CSS_URL = env.VITE_DEMO_THREE_CSS_URL
  process.env.VITE_DEMO_COUNTER_CSS_URL = env.VITE_DEMO_COUNTER_CSS_URL

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
            entry: demoOneRemoteEntry,
            entryGlobalName: "demoOneApp",
            shareScope: "default",
          },
          demoTwoApp: {
            type: "module",
            name: "demoTwoApp",
            entry: demoTwoRemoteEntry,
            entryGlobalName: "demoTwoApp",
            shareScope: "default",
          },
          demoThreeApp: {
            type: "module",
            name: "demoThreeApp",
            entry: demoThreeRemoteEntry,
            entryGlobalName: "demoThreeApp",
            shareScope: "default",
          },
          demoCounterApp: {
            type: "module",
            name: "demoCounterApp",
            entry: demoCounterRemoteEntry,
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
          assetFileNames: 'assets/[name].[ext]'
        },
        external: [],
      }
    },
    server: {
      port: parseInt(env.VITE_SHELL_PORT),
      cors: true,
      fs: {
        allow: ["..", "."]
      },
      allowedHosts: true,
    },
    preview: {
      port: parseInt(env.VITE_SHELL_PORT),
      cors: true,
    }
  }
});
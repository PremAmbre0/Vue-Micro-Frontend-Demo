import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load environment variables from root directory
  const env = loadEnv(mode, '../', '')

  // Validate required environment variables
  const requiredEnvVars = ['VITE_SHELL_REMOTE_ENTRY', 'VITE_DEMO_COUNTER_PORT']
  const missingVars = requiredEnvVars.filter(varName => !env[varName])
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}. Please check your .env.local or .env.production file.`)
  }

  // Use environment variables for remote entries
  const shellRemoteEntry = env.VITE_SHELL_REMOTE_ENTRY

  return {
    base: "/",
    plugins: [
      federation({
        filename: "remoteEntry.js",
        name: "demoCounterApp",
        exposes: {
          "./CounterDemo": "./src/components/CounterDemo.vue",
        },
        remotes: {
          shellApp: {
            type: "module",
            name: "shellApp",
            entry: shellRemoteEntry,
            entryGlobalName: "shellApp",
            shareScope: "default",
          },
        },
        shared: {
          vue: { singleton: true },
          pinia: { singleton: true }
        }
      }),
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
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
      },
    },
    server: {
      port: parseInt(env.VITE_DEMO_COUNTER_PORT),
      cors: true,
      fs: {
        allow: ["..", "."]
      },
      allowedHosts: true,
    },
    preview: {
      port: parseInt(env.VITE_DEMO_COUNTER_PORT),
      cors: true,
    }
  }
});

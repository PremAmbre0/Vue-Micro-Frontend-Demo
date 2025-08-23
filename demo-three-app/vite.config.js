import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load environment variables from root directory
  const env = loadEnv(mode, '../', '')

  // Validate required environment variables
  const requiredEnvVars = ['VITE_SHELL_REMOTE_ENTRY', 'VITE_DEMO_THREE_PORT']
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
        name: "demoThreeApp",
        exposes: {
          "./DemoThreeCanvas": "./src/components/DemoThreeCanvas.vue",
          "./demoThreeLogic": "./src/fabric/demoThree.js",
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
          fabric: { singleton: true }
        }
      }),
      vue(),
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
      outDir: "dist",
      target: "chrome89",
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
          assetFileNames: 'assets/[name].[ext]'
        },
      },
    },
    server: {
      port: parseInt(env.VITE_DEMO_THREE_PORT),
      cors: true,
      fs: {
        allow: ["..", "."]
      },
      allowedHosts: true,
    },
    preview: {
      port: parseInt(env.VITE_DEMO_THREE_PORT),
      cors: true,
    }
  }
});
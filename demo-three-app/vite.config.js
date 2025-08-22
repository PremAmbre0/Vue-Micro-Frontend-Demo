import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Determine the root directory for environment files
  const rootDir = process.cwd().includes('demo-three-app') ? '../' : './'

  // Load environment variables from the root directory
  const env = loadEnv(mode, rootDir, '')

  // Environment-based configuration
  const isDevelopment = mode === 'development'
  const isProduction = mode === 'production'

  // Default shell URL
  const defaultShellUrl = 'http://localhost:3000/remoteEntry.js'
  const shellRemoteEntry = env.VITE_SHELL_REMOTE_ENTRY || defaultShellUrl

  // Debug logging for environment variables
  console.log(`🖌️ Demo Three App - Mode: ${mode}`)
  console.log(`🖌️ Demo Three App - Root Dir: ${rootDir}`)
  console.log(`🖌️ Demo Three App - Is Development: ${isDevelopment}`)
  console.log(`🖌️ Demo Three App - Is Production: ${isProduction}`)
  console.log(`🖌️ Demo Three App - Shell Remote Entry: ${shellRemoteEntry}`)

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
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'assets/style.css'
            }
            return 'assets/[name].[hash].[ext]'
          }
        },
      },
    },
    server: {
      port: parseInt(env.VITE_DEMO_THREE_PORT) || 3003,
      cors: true,
      fs: {
        allow: ["..", "."]
      },
      allowedHosts: true,
    },
    preview: {
      port: parseInt(env.VITE_DEMO_THREE_PORT) || 3003,
      cors: true,
    }
  }
});
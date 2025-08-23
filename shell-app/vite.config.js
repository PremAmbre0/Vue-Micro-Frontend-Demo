import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // For development and preview modes, use local URLs
  const isLocal = mode === 'development' || mode === 'preview'

  // Fallback values for production deployment
  const demoOneRemoteEntry = env.VITE_DEMO_ONE_REMOTE_ENTRY || (isLocal ? 'http://localhost:3001/remoteEntry.js' : 'https://demo-app-one-two.vercel.app/remoteEntry.js')
  const demoTwoRemoteEntry = env.VITE_DEMO_TWO_REMOTE_ENTRY || (isLocal ? 'http://localhost:3002/remoteEntry.js' : 'https://demo-app-two-delta.vercel.app/remoteEntry.js')
  const demoThreeRemoteEntry = env.VITE_DEMO_THREE_REMOTE_ENTRY || (isLocal ? 'http://localhost:3003/remoteEntry.js' : 'https://demo-app-three-jet.vercel.app/remoteEntry.js')
  const demoCounterRemoteEntry = env.VITE_DEMO_COUNTER_REMOTE_ENTRY || (isLocal ? 'http://localhost:3004/remoteEntry.js' : 'https://demo-counter.vercel.app/remoteEntry.js')

  // Define CSS URLs for environment variables
  // Note: CSS files have hashed names in production, so these URLs need to be set correctly in Vercel
  process.env.VITE_DEMO_ONE_CSS_URL = env.VITE_DEMO_ONE_CSS_URL || ''
  process.env.VITE_DEMO_TWO_CSS_URL = env.VITE_DEMO_TWO_CSS_URL || ''
  process.env.VITE_DEMO_THREE_CSS_URL = env.VITE_DEMO_THREE_CSS_URL || ''
  process.env.VITE_DEMO_COUNTER_CSS_URL = env.VITE_DEMO_COUNTER_CSS_URL || ''

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
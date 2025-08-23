import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // For development and preview modes, use local URLs
  const isLocal = mode === 'development' || mode === 'preview'

  // Fallback values for production deployment
  const shellRemoteEntry = env.VITE_SHELL_REMOTE_ENTRY || (isLocal ? 'http://localhost:3000/remoteEntry.js' : 'https://shell-app-seven.vercel.app/remoteEntry.js')

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
      port: parseInt(env.VITE_DEMO_COUNTER_PORT) || 3004,
      cors: true,
      fs: {
        allow: ["..", "."]
      },
      allowedHosts: true,
    },
    preview: {
      port: parseInt(env.VITE_DEMO_COUNTER_PORT) || 3004,
      cors: true,
    }
  }
});

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
            entry: env.VITE_SHELL_REMOTE_ENTRY || "http://localhost:3000/remoteEntry.js",
            entryGlobalName: "shellApp",
            shareScope: "default",
          },
        },
        shared: {
          vue: { singleton: true }
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
      outDir: "../dist/demo-counter-app",
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
      outDir: "../dist/demo-counter-app",
    }
  }
});

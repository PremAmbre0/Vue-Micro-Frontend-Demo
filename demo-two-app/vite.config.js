import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: "/",
    plugins: [
      federation({
        filename: "remoteEntry.js",
        name: "demoTwoApp",
        exposes: {
          "./DemoTwoCanvas": "./src/components/DemoTwoCanvas.vue",
          "./demoTwoLogic": "./src/fabric/demoTwo.js",
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
            if (assetInfo.fileName && assetInfo.fileName.endsWith('.css')) {
              return 'assets/style.css'
            }
            return 'assets/[name].[hash].[ext]'
          }
        },
      },
    },
    server: {
      port: parseInt(env.VITE_DEMO_TWO_PORT) || 3002,
      cors: true,
      fs: {
        allow: ["..", "."]
      },
      allowedHosts: true,
    },
    preview: {
      port: parseInt(env.VITE_DEMO_TWO_PORT) || 3002,
      cors: true,
    }
  }
});
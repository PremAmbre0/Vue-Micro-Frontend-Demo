/**
 * Shared Vite Environment Configuration for Micro Frontend Architecture
 * 
 * This utility provides consistent environment variable loading and configuration
 * across all micro frontend applications in the workspace.
 */

import { loadEnv } from 'vite'
import path from 'path'

/**
 * Load environment variables from the root directory
 * @param {string} mode - Vite mode (development, production, etc.)
 * @param {string} appName - Name of the current app for logging
 * @returns {object} Environment configuration object
 */
export function loadMicroFrontendEnv(mode, appName) {
  // Determine the root directory for environment files
  const rootDir = process.cwd().includes(appName) ? '../' : './'
  
  // Load environment variables from the root directory
  const env = loadEnv(mode, rootDir, '')
  
  // Environment flags
  const isDevelopment = mode === 'development'
  const isProduction = mode === 'production'
  
  // Default development URLs
  const defaultUrls = {
    shell: 'http://localhost:3000/remoteEntry.js',
    demoOne: 'http://localhost:3001/remoteEntry.js',
    demoTwo: 'http://localhost:3002/remoteEntry.js',
    demoThree: 'http://localhost:3003/remoteEntry.js',
    demoCounter: 'http://localhost:3004/remoteEntry.js'
  }
  
  // Helper function to get remote entry URLs with fallbacks
  const getRemoteEntry = (envVar, defaultUrl) => {
    const url = env[envVar] || defaultUrl
    console.log(`${getAppIcon(appName)} ${appName} - ${envVar}: ${url}`)
    return url
  }
  
  // Debug logging
  console.log(`${getAppIcon(appName)} ${appName} - Mode: ${mode}`)
  console.log(`${getAppIcon(appName)} ${appName} - Root Dir: ${rootDir}`)
  console.log(`${getAppIcon(appName)} ${appName} - Is Development: ${isDevelopment}`)
  console.log(`${getAppIcon(appName)} ${appName} - Is Production: ${isProduction}`)
  
  return {
    env,
    mode,
    isDevelopment,
    isProduction,
    rootDir,
    defaultUrls,
    getRemoteEntry
  }
}

/**
 * Get app-specific icon for logging
 * @param {string} appName - Name of the app
 * @returns {string} Icon emoji
 */
function getAppIcon(appName) {
  const icons = {
    'Shell App': '🏠',
    'Demo One App': '🎨',
    'Demo Two App': '📝',
    'Demo Three App': '🖌️',
    'Demo Counter App': '🔢'
  }
  return icons[appName] || '📦'
}

/**
 * Get standard shared dependencies configuration
 * @param {boolean} includeExtras - Whether to include extra dependencies like fabric, pinia
 * @returns {object} Shared dependencies configuration
 */
export function getSharedDependencies(includeExtras = false) {
  const shared = {
    vue: {
      singleton: true,
      requiredVersion: "^3.5.18"
    }
  }
  
  if (includeExtras) {
    shared["vue-router"] = {
      singleton: true,
      requiredVersion: "^4.2.4"
    }
    shared.pinia = {
      singleton: true,
      requiredVersion: "^2.1.7"
    }
    shared.fabric = {
      singleton: true,
      requiredVersion: "^5.3.0"
    }
  }
  
  return shared
}

/**
 * Get standard build configuration
 * @param {string} appType - Type of app ('shell' or 'remote')
 * @returns {object} Build configuration
 */
export function getBuildConfig(appType = 'remote') {
  return {
    outDir: "dist",
    target: "chrome89",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.fileName && assetInfo.fileName.endsWith('.css')) {
            return appType === 'shell' ? 'style.css' : 'assets/style.css'
          }
          return appType === 'shell' ? assetInfo.fileName : 'assets/[name].[hash].[ext]'
        }
      }
    }
  }
}

/**
 * Get standard server configuration
 * @param {object} env - Environment variables
 * @param {string} portEnvVar - Environment variable name for port
 * @param {number} defaultPort - Default port number
 * @returns {object} Server configuration
 */
export function getServerConfig(env, portEnvVar, defaultPort) {
  return {
    port: parseInt(env[portEnvVar]) || defaultPort,
    cors: true,
    fs: {
      allow: ["..", "."]
    },
    allowedHosts: true,
  }
}

#!/usr/bin/env node

/**
 * Script to update environment URLs for deployment
 * Usage: node scripts/update-env.js <shell-url> <test-url>
 * Example: node scripts/update-env.js https://shell.example.com https://test.example.com
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log('Usage: node scripts/update-env.js <shell-url> <test-url>');
  console.log('Example: node scripts/update-env.js https://shell.example.com https://test.example.com');
  process.exit(1);
}

const [shellUrl, testUrl] = args;

// Update root .env.production
const rootEnvProd = `# Production Environment Configuration for Micro Frontend Architecture

# Production URLs
VITE_SHELL_APP_URL=${shellUrl}
VITE_TEST_APP_URL=${testUrl}

# Remote Entry Points
VITE_SHELL_REMOTE_ENTRY=${shellUrl}/remoteEntry.js
VITE_TEST_REMOTE_ENTRY=${testUrl}/remoteEntry.js

# CSS URLs for production
VITE_TEST_APP_CSS_URL=${testUrl}/assets/style.css

# Environment
NODE_ENV=production`;

// Update shell-app .env.production
const shellEnvProd = `# Shell App Production Environment Configuration

# Production URLs
VITE_SHELL_APP_URL=${shellUrl}
VITE_TEST_APP_URL=${testUrl}

# Remote Entry Points
VITE_TEST_REMOTE_ENTRY=${testUrl}/remoteEntry.js

# CSS URLs
VITE_TEST_APP_CSS_URL=${testUrl}/assets/style.css

# Base URL (should be empty for root path)
VITE_APP_BASE_URL=""`;

// Update test-app .env.production
const testEnvProd = `# Test App Production Environment Configuration

# Production URLs
VITE_SHELL_APP_URL=${shellUrl}
VITE_TEST_APP_URL=${testUrl}

# Remote Entry Points
VITE_SHELL_REMOTE_ENTRY=${shellUrl}/remoteEntry.js

# Base URL (should be empty for root path)
VITE_APP_BASE_URL=""`;

try {
  fs.writeFileSync('.env.production', rootEnvProd);
  fs.writeFileSync('shell-app/.env.production', shellEnvProd);
  fs.writeFileSync('test-app/.env.production', testEnvProd);
  
  console.log('✅ Environment files updated successfully!');
  console.log(`Shell App URL: ${shellUrl}`);
  console.log(`Test App URL: ${testUrl}`);
  console.log('\nNext steps:');
  console.log('1. npm run build');
  console.log('2. Deploy the dist folders to your servers');
  
} catch (error) {
  console.error('❌ Error updating environment files:', error.message);
  process.exit(1);
}

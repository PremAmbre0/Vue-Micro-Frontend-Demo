#!/usr/bin/env node

/**
 * Script to update environment URLs for deployment
 * Usage: node scripts/update-env.js <shell-url> <test-url>
 * Example: node scripts/update-env.js https://shell.example.com https://test.example.com
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length !== 4) {
  console.log('Usage: node scripts/update-env.js <shell-url> <demo-one-url> <demo-two-url> <demo-three-url>');
  console.log('Example: node scripts/update-env.js https://shell.example.com https://demo1.example.com https://demo2.example.com https://demo3.example.com');
  process.exit(1);
}

const [shellUrl, demoOneUrl, demoTwoUrl, demoThreeUrl] = args;

// Update root .env.production
const rootEnvProd = `# Production Environment Configuration for Micro Frontend Architecture

# Production URLs
VITE_SHELL_APP_URL=${shellUrl}
VITE_DEMO_ONE_APP_URL=${demoOneUrl}
VITE_DEMO_TWO_APP_URL=${demoTwoUrl}
VITE_DEMO_THREE_APP_URL=${demoThreeUrl}

# Remote Entry Points
VITE_SHELL_REMOTE_ENTRY=${shellUrl}/remoteEntry.js
VITE_DEMO_ONE_REMOTE_ENTRY=${demoOneUrl}/remoteEntry.js
VITE_DEMO_TWO_REMOTE_ENTRY=${demoTwoUrl}/remoteEntry.js
VITE_DEMO_THREE_REMOTE_ENTRY=${demoThreeUrl}/remoteEntry.js

# CSS URLs for production
VITE_DEMO_ONE_CSS_URL=${demoOneUrl}/assets/style.css
VITE_DEMO_TWO_CSS_URL=${demoTwoUrl}/assets/style.css
VITE_DEMO_THREE_CSS_URL=${demoThreeUrl}/assets/style.css

# Environment
NODE_ENV=production`;

// Update shell-app .env.production
const shellEnvProd = `# Shell App Production Environment Configuration

# Production URLs
VITE_SHELL_APP_URL=${shellUrl}
VITE_DEMO_ONE_APP_URL=${demoOneUrl}
VITE_DEMO_TWO_APP_URL=${demoTwoUrl}
VITE_DEMO_THREE_APP_URL=${demoThreeUrl}

# Remote Entry Points
VITE_DEMO_ONE_REMOTE_ENTRY=${demoOneUrl}/remoteEntry.js
VITE_DEMO_TWO_REMOTE_ENTRY=${demoTwoUrl}/remoteEntry.js
VITE_DEMO_THREE_REMOTE_ENTRY=${demoThreeUrl}/remoteEntry.js

# CSS URLs
VITE_DEMO_ONE_CSS_URL=${demoOneUrl}/assets/style.css
VITE_DEMO_TWO_CSS_URL=${demoTwoUrl}/assets/style.css
VITE_DEMO_THREE_CSS_URL=${demoThreeUrl}/assets/style.css

# Base URL (should be empty for root path)
VITE_APP_BASE_URL=""`;

// Update demo-one-app .env.production
const demoOneEnvProd = `# Demo One App Production Environment Configuration

# Production URLs
VITE_SHELL_APP_URL=${shellUrl}
VITE_DEMO_ONE_APP_URL=${demoOneUrl}

# Remote Entry Points
VITE_SHELL_REMOTE_ENTRY=${shellUrl}/remoteEntry.js

# Base URL (should be empty for root path)
VITE_APP_BASE_URL=""`;

// Update demo-two-app .env.production
const demoTwoEnvProd = `# Demo Two App Production Environment Configuration

# Production URLs
VITE_SHELL_APP_URL=${shellUrl}
VITE_DEMO_TWO_APP_URL=${demoTwoUrl}

# Remote Entry Points
VITE_SHELL_REMOTE_ENTRY=${shellUrl}/remoteEntry.js

# Base URL (should be empty for root path)
VITE_APP_BASE_URL=""`;

// Update demo-three-app .env.production
const demoThreeEnvProd = `# Demo Three App Production Environment Configuration

# Production URLs
VITE_SHELL_APP_URL=${shellUrl}
VITE_DEMO_THREE_APP_URL=${demoThreeUrl}

# Remote Entry Points
VITE_SHELL_REMOTE_ENTRY=${shellUrl}/remoteEntry.js

# Base URL (should be empty for root path)
VITE_APP_BASE_URL=""`;

try {
  fs.writeFileSync('.env.production', rootEnvProd);
  fs.writeFileSync('shell-app/.env.production', shellEnvProd);
  fs.writeFileSync('demo-one-app/.env.production', demoOneEnvProd);
  fs.writeFileSync('demo-two-app/.env.production', demoTwoEnvProd);
  fs.writeFileSync('demo-three-app/.env.production', demoThreeEnvProd);

  console.log('✅ Environment files updated successfully!');
  console.log(`Shell App URL: ${shellUrl}`);
  console.log(`Demo One App URL: ${demoOneUrl}`);
  console.log(`Demo Two App URL: ${demoTwoUrl}`);
  console.log(`Demo Three App URL: ${demoThreeUrl}`);
  console.log('\nNext steps:');
  console.log('1. npm run build');
  console.log('2. Deploy the dist folders to your servers');
  console.log('   - shell-app/dist/ → Shell App server');
  console.log('   - demo-one-app/dist/ → Demo One server');
  console.log('   - demo-two-app/dist/ → Demo Two server');
  console.log('   - demo-three-app/dist/ → Demo Three server');

} catch (error) {
  console.error('❌ Error updating environment files:', error.message);
  process.exit(1);
}

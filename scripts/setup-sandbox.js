#!/usr/bin/env node

/**
 * Sandbox Setup Script for Vue Micro Frontend Demo
 * This script helps users configure their own URLs for testing the architecture
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupSandbox() {
  console.log('🏗️  Vue Micro Frontend Architecture - Sandbox Setup');
  console.log('====================================================\n');
  
  console.log('This script will help you configure the sandbox environment with your own URLs.');
  console.log('You can use any hosting platform (Vercel, Netlify, GitHub Pages, etc.)\n');

  // Get user URLs
  const shellUrl = await question('Enter your Shell App URL (e.g., https://my-shell-app.vercel.app): ');
  const demoOneUrl = await question('Enter your Demo One App URL (e.g., https://my-demo-one.vercel.app): ');
  const demoTwoUrl = await question('Enter your Demo Two App URL (e.g., https://my-demo-two.vercel.app): ');
  const demoThreeUrl = await question('Enter your Demo Three App URL (e.g., https://my-demo-three.vercel.app): ');
  const demoCounterUrl = await question('Enter your Demo Counter App URL (e.g., https://my-demo-counter.vercel.app): ');

  // Validate URLs
  const urls = [shellUrl, demoOneUrl, demoTwoUrl, demoThreeUrl, demoCounterUrl];
  const urlPattern = /^https?:\/\/.+/;
  
  for (const url of urls) {
    if (!urlPattern.test(url)) {
      console.error(`❌ Invalid URL: ${url}. Please make sure URLs start with http:// or https://`);
      rl.close();
      process.exit(1);
    }
  }

  // Create sandbox environment content
  const sandboxEnv = `# Sandbox Environment Configuration
# Generated on ${new Date().toISOString()}
# This file is for testing and trying out the micro frontend architecture

# Sandbox Ports (for local preview of sandbox builds)
VITE_SHELL_PORT=3000
VITE_DEMO_ONE_PORT=3001
VITE_DEMO_TWO_PORT=3002
VITE_DEMO_THREE_PORT=3003
VITE_DEMO_COUNTER_PORT=3004

# Sandbox URLs
VITE_SHELL_APP_URL=${shellUrl}
VITE_DEMO_ONE_APP_URL=${demoOneUrl}
VITE_DEMO_TWO_APP_URL=${demoTwoUrl}
VITE_DEMO_THREE_APP_URL=${demoThreeUrl}
VITE_DEMO_COUNTER_APP_URL=${demoCounterUrl}

# Remote Entry Points (Sandbox)
VITE_SHELL_REMOTE_ENTRY=${shellUrl}/remoteEntry.js
VITE_DEMO_ONE_REMOTE_ENTRY=${demoOneUrl}/remoteEntry.js
VITE_DEMO_TWO_REMOTE_ENTRY=${demoTwoUrl}/remoteEntry.js
VITE_DEMO_THREE_REMOTE_ENTRY=${demoThreeUrl}/remoteEntry.js
VITE_DEMO_COUNTER_REMOTE_ENTRY=${demoCounterUrl}/remoteEntry.js

# CSS URLs for sandbox
VITE_DEMO_ONE_CSS_URL=${demoOneUrl}/assets/style.css
VITE_DEMO_TWO_CSS_URL=${demoTwoUrl}/assets/style.css
VITE_DEMO_THREE_CSS_URL=${demoThreeUrl}/assets/style.css
VITE_DEMO_COUNTER_CSS_URL=${demoCounterUrl}/assets/style.css`;

  // Write root .env.sandbox
  writeFileSync('.env.sandbox', sandboxEnv);
  
  // Create individual app sandbox env files
  const apps = [
    { name: 'shell-app', url: shellUrl, port: 'VITE_SHELL_PORT=3000' },
    { name: 'demo-one-app', url: demoOneUrl, port: 'VITE_DEMO_ONE_PORT=3001' },
    { name: 'demo-two-app', url: demoTwoUrl, port: 'VITE_DEMO_TWO_PORT=3002' },
    { name: 'demo-three-app', url: demoThreeUrl, port: 'VITE_DEMO_THREE_PORT=3003' },
    { name: 'demo-counter-app', url: demoCounterUrl, port: 'VITE_DEMO_COUNTER_PORT=3004' }
  ];

  apps.forEach(app => {
    const appSandboxEnv = `# ${app.name} Sandbox Environment Configuration
# Generated on ${new Date().toISOString()}

# Sandbox Ports
${app.port}

# Sandbox URLs
VITE_SHELL_APP_URL=${shellUrl}
VITE_${app.name.toUpperCase().replace(/-/g, '_')}_APP_URL=${app.url}

# Remote Entry Points
VITE_SHELL_REMOTE_ENTRY=${shellUrl}/remoteEntry.js`;

    writeFileSync(`${app.name}/.env.sandbox`, appSandboxEnv);
  });

  console.log('\n✅ Sandbox environment configured successfully!');
  console.log('\n📁 Files created:');
  console.log('   - .env.sandbox (root)');
  apps.forEach(app => {
    console.log(`   - ${app.name}/.env.sandbox`);
  });
  
  console.log('\n🚀 Next steps:');
  console.log('   1. Deploy each app to your hosting platform');
  console.log('   2. Run: npm run build:sandbox');
  console.log('   3. Run: npm run preview:sandbox');
  console.log('\n💡 Tip: You can re-run this script anytime to update URLs');
  
  rl.close();
}

setupSandbox().catch(console.error);

#!/usr/bin/env node

/**
 * Smart script to update .env.local with proper preview URLs
 * Automatically detects CodeSandbox environment and generates appropriate URLs
 */

import { writeFileSync } from 'fs';
import { getCodeSandboxHost } from '@codesandbox/utils';

// Get the appropriate base URL for the environment
function getBaseUrl(port) {
  try {
    // Try to get CodeSandbox host
    const codeSandboxHost = getCodeSandboxHost(port);
    if (codeSandboxHost) {
      return `https://${codeSandboxHost}`;
    }
  } catch (error) {
    // Not in CodeSandbox environment, use localhost
  }

  // Fallback to localhost for local development
  return `http://localhost:${port}`;
}

// Generate environment configuration with smart URL detection
function generateLocalEnvConfig() {
  const shellUrl = getBaseUrl(3000);
  const demoOneUrl = getBaseUrl(3001);
  const demoTwoUrl = getBaseUrl(3002);
  const demoThreeUrl = getBaseUrl(3003);
  const demoCounterUrl = getBaseUrl(3004);

  const isCodeSandbox = shellUrl.includes('https://');
  const envType = isCodeSandbox ? 'CodeSandbox Preview URLs' : 'Local Development URLs';

  return `# Smart Environment Configuration
# Generated on ${new Date().toISOString()}
# Environment: ${envType}

# Development Ports
VITE_SHELL_PORT=3000
VITE_DEMO_ONE_PORT=3001
VITE_DEMO_TWO_PORT=3002
VITE_DEMO_THREE_PORT=3003
VITE_DEMO_COUNTER_PORT=3004

# Development URLs (Auto-detected)
VITE_SHELL_APP_URL=${shellUrl}
VITE_DEMO_ONE_APP_URL=${demoOneUrl}
VITE_DEMO_TWO_APP_URL=${demoTwoUrl}
VITE_DEMO_THREE_APP_URL=${demoThreeUrl}
VITE_DEMO_COUNTER_APP_URL=${demoCounterUrl}

# Remote Entry Points (Auto-detected)
VITE_SHELL_REMOTE_ENTRY=${shellUrl}/remoteEntry.js
VITE_DEMO_ONE_REMOTE_ENTRY=${demoOneUrl}/remoteEntry.js
VITE_DEMO_TWO_REMOTE_ENTRY=${demoTwoUrl}/remoteEntry.js
VITE_DEMO_THREE_REMOTE_ENTRY=${demoThreeUrl}/remoteEntry.js
VITE_DEMO_COUNTER_REMOTE_ENTRY=${demoCounterUrl}/remoteEntry.js

# CSS URLs for development (Auto-detected)
VITE_DEMO_ONE_CSS_URL=${demoOneUrl}/assets/style.css
VITE_DEMO_TWO_CSS_URL=${demoTwoUrl}/assets/style.css
VITE_DEMO_THREE_CSS_URL=${demoThreeUrl}/assets/style.css
VITE_DEMO_COUNTER_CSS_URL=${demoCounterUrl}/assets/style.css`;
}

// Generate individual app env config with smart URL detection
function generateAppEnvConfig(appName, appPort) {
  const shellUrl = getBaseUrl(3000);
  const appUrl = getBaseUrl(appPort);
  const isCodeSandbox = shellUrl.includes('https://');
  const envType = isCodeSandbox ? 'CodeSandbox Preview URLs' : 'Local Development URLs';

  return `# ${appName} Smart Environment Configuration
# Generated on ${new Date().toISOString()}
# Environment: ${envType}

# Development Ports
VITE_${appName.toUpperCase().replace(/-/g, '_')}_PORT=${appPort}

# Development URLs (Auto-detected)
VITE_SHELL_APP_URL=${shellUrl}
VITE_${appName.toUpperCase().replace(/-/g, '_')}_APP_URL=${appUrl}

# Remote Entry Points (Auto-detected)
VITE_SHELL_REMOTE_ENTRY=${shellUrl}/remoteEntry.js`;
}

function setupLocalDevelopment() {
  // Detect environment
  const testUrl = getBaseUrl(3000);
  const isCodeSandbox = testUrl.includes('https://');
  const envName = isCodeSandbox ? 'CodeSandbox' : 'Local';

  console.log(`🔧 Setting up ${envName} development environment...\n`);

  if (isCodeSandbox) {
    console.log('🌐 CodeSandbox environment detected!');
    console.log('   Using automatic preview URLs from @codesandbox/utils\n');
  } else {
    console.log('💻 Local environment detected');
    console.log('   Using localhost URLs for development\n');
  }

  // Generate root .env.local
  const rootEnvConfig = generateLocalEnvConfig();
  writeFileSync('.env.local', rootEnvConfig);
  console.log('✅ Created .env.local (root)');

  // Generate individual app .env.local files
  const apps = [
    { name: 'shell-app', port: 3000 },
    { name: 'demo-one-app', port: 3001 },
    { name: 'demo-two-app', port: 3002 },
    { name: 'demo-three-app', port: 3003 },
    { name: 'demo-counter-app', port: 3004 }
  ];

  apps.forEach(app => {
    const appEnvConfig = generateAppEnvConfig(app.name, app.port);
    writeFileSync(`${app.name}/.env.local`, appEnvConfig);
    console.log(`✅ Created ${app.name}/.env.local`);
  });

  console.log(`\n🎯 ${envName} development environment ready!`);
  if (isCodeSandbox) {
    console.log('   - All .env.local files updated with CodeSandbox preview URLs');
    console.log('   - URLs automatically generated for ports 3000-3004');
  } else {
    console.log('   - All .env.local files updated with localhost URLs');
    console.log('   - Ports: 3000 (shell), 3001-3004 (demos)');
  }
  console.log('\n🚀 You can now run: npm run dev');
}

// Run the setup
setupLocalDevelopment();

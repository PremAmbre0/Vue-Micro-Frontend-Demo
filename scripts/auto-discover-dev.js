#!/usr/bin/env node

/**
 * Auto-discovery script for development URLs
 * Similar to CodeSandbox preview URLs - automatically detects and configures running services
 * Provides seamless development experience without manual URL configuration
 */

import { writeFileSync, existsSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import net from 'net';

const execAsync = promisify(exec);

// Service definitions - similar to CodeSandbox's service discovery
const SERVICES = {
  'shell-app': {
    port: 3000,
    envPrefix: 'VITE_SHELL',
    name: 'Shell App',
    description: 'Main micro frontend orchestrator'
  },
  'demo-one-app': {
    port: 3001,
    envPrefix: 'VITE_DEMO_ONE',
    name: 'Demo One',
    description: 'Shapes and basic canvas demo'
  },
  'demo-two-app': {
    port: 3002,
    envPrefix: 'VITE_DEMO_TWO',
    name: 'Demo Two',
    description: 'Text and images demo'
  },
  'demo-three-app': {
    port: 3003,
    envPrefix: 'VITE_DEMO_THREE',
    name: 'Demo Three',
    description: 'Drawing and advanced canvas demo'
  },
  'demo-counter-app': {
    port: 3004,
    envPrefix: 'VITE_DEMO_COUNTER',
    name: 'Demo Counter',
    description: 'State management demo'
  }
};

// Check if a port is in use (cross-platform)
async function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(false));
      server.close();
    });
    server.on('error', () => resolve(true));
  });
}

// Check if a development server is healthy and accessible
async function checkServiceHealth(port) {
  try {
    const url = `http://localhost:${port}`;
    const response = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });
    return {
      accessible: response.ok,
      url: url,
      status: response.status
    };
  } catch (error) {
    return {
      accessible: false,
      url: `http://localhost:${port}`,
      error: error.message
    };
  }
}

// Discover all running services
async function discoverServices() {
  const discoveredServices = {};

  console.log('🔍 Scanning for running micro frontend services...\n');

  for (const [serviceId, config] of Object.entries(SERVICES)) {
    const isRunning = await isPortInUse(config.port);
    const health = isRunning ? await checkServiceHealth(config.port) : null;

    discoveredServices[serviceId] = {
      ...config,
      isRunning,
      health,
      url: `http://localhost:${config.port}`
    };

    const status = isRunning ?
      (health?.accessible ? '🟢 Running & Healthy' : '🟡 Running but not accessible') :
      '⚪ Not running';

    console.log(`${config.name.padEnd(15)} (Port ${config.port}): ${status}`);
    if (health?.accessible) {
      console.log(`   └─ Preview: ${health.url}`);
    }
  }

  return discoveredServices;
}

// Generate environment configuration from discovered services
function generateEnvConfig(services) {
  const shellService = services['shell-app'];
  const demoOneService = services['demo-one-app'];
  const demoTwoService = services['demo-two-app'];
  const demoThreeService = services['demo-three-app'];
  const demoCounterService = services['demo-counter-app'];

  return `# Auto-generated development environment configuration
# Generated on ${new Date().toISOString()}
# This file is automatically created by the service discovery system
# Similar to CodeSandbox preview URLs - automatically detects running services

# Development Ports
VITE_SHELL_PORT=${shellService.port}
VITE_DEMO_ONE_PORT=${demoOneService.port}
VITE_DEMO_TWO_PORT=${demoTwoService.port}
VITE_DEMO_THREE_PORT=${demoThreeService.port}
VITE_DEMO_COUNTER_PORT=${demoCounterService.port}

# Development URLs (Auto-discovered)
VITE_SHELL_APP_URL=${shellService.url}
VITE_DEMO_ONE_APP_URL=${demoOneService.url}
VITE_DEMO_TWO_APP_URL=${demoTwoService.url}
VITE_DEMO_THREE_APP_URL=${demoThreeService.url}
VITE_DEMO_COUNTER_APP_URL=${demoCounterService.url}

# Remote Entry Points (Auto-discovered)
VITE_SHELL_REMOTE_ENTRY=${shellService.url}/remoteEntry.js
VITE_DEMO_ONE_REMOTE_ENTRY=${demoOneService.url}/remoteEntry.js
VITE_DEMO_TWO_REMOTE_ENTRY=${demoTwoService.url}/remoteEntry.js
VITE_DEMO_THREE_REMOTE_ENTRY=${demoThreeService.url}/remoteEntry.js
VITE_DEMO_COUNTER_REMOTE_ENTRY=${demoCounterService.url}/remoteEntry.js

# CSS URLs for development (Auto-discovered)
VITE_DEMO_ONE_CSS_URL=${demoOneService.url}/assets/style.css
VITE_DEMO_TWO_CSS_URL=${demoTwoService.url}/assets/style.css
VITE_DEMO_THREE_CSS_URL=${demoThreeService.url}/assets/style.css
VITE_DEMO_COUNTER_CSS_URL=${demoCounterService.url}/assets/style.css

# Service Status (for reference)
# Shell App: ${shellService.isRunning ? '🟢 Running' : '⚪ Not running'}
# Demo One: ${demoOneService.isRunning ? '🟢 Running' : '⚪ Not running'}
# Demo Two: ${demoTwoService.isRunning ? '🟢 Running' : '⚪ Not running'}
# Demo Three: ${demoThreeService.isRunning ? '🟢 Running' : '⚪ Not running'}
# Demo Counter: ${demoCounterService.isRunning ? '🟢 Running' : '⚪ Not running'}`;
}

// Generate individual app env config
function generateAppEnvConfig(serviceId, services) {
  const service = services[serviceId];
  const shellService = services['shell-app'];

  return `# Auto-generated ${service.name} development environment configuration
# Generated on ${new Date().toISOString()}
# Service discovery system - automatically configured

# Development Ports
${service.envPrefix}_PORT=${service.port}

# Development URLs (Auto-discovered)
VITE_SHELL_APP_URL=${shellService.url}
${service.envPrefix}_APP_URL=${service.url}

# Remote Entry Points (Auto-discovered)
VITE_SHELL_REMOTE_ENTRY=${shellService.url}/remoteEntry.js

# Service Status
# ${service.name}: ${service.isRunning ? '🟢 Running' : '⚪ Not running'}
# Shell App: ${shellService.isRunning ? '🟢 Running' : '⚪ Not running'}`;
}

async function autoDiscoverDevelopmentUrls() {
  console.log('� Vue Micro Frontend - Service Discovery');
  console.log('==========================================');
  console.log('Similar to CodeSandbox preview URLs - automatic service detection\n');

  // Discover all services
  const services = await discoverServices();

  console.log('\n📝 Generating environment configuration...');

  // Generate root .env.local
  const rootEnvConfig = generateEnvConfig(services);
  writeFileSync('.env.local', rootEnvConfig);
  console.log('✅ Created .env.local (root)');

  // Generate individual app .env.local files
  Object.keys(services).forEach(serviceId => {
    const appEnvConfig = generateAppEnvConfig(serviceId, services);
    writeFileSync(`${serviceId}/.env.local`, appEnvConfig);
    console.log(`✅ Created ${serviceId}/.env.local`);
  });

  // Summary
  const runningCount = Object.values(services).filter(s => s.isRunning && s.health?.accessible).length;
  const totalCount = Object.keys(services).length;

  console.log('\n🎯 Service Discovery Summary:');
  console.log(`   - ${runningCount}/${totalCount} services running and accessible`);
  console.log('   - All environment files auto-configured');
  console.log('   - Ready for seamless micro frontend development');

  if (runningCount > 0) {
    console.log('\n🌐 Available Preview URLs:');
    Object.values(services)
      .filter(s => s.isRunning && s.health?.accessible)
      .forEach(service => {
        console.log(`   - ${service.name}: ${service.url}`);
      });
    console.log('\n💡 These services will be automatically used by other micro frontends');
  } else {
    console.log('\n💡 No services currently running.');
    console.log('   Start all services: npm run dev');
    console.log('   Start individual apps in separate terminals for testing');
  }

  console.log('\n✨ CodeSandbox-style Development Experience Ready!');
  console.log('   ✅ Automatic service discovery');
  console.log('   ✅ No manual URL configuration');
  console.log('   ✅ Preview URLs auto-generated');
  console.log('   ✅ Seamless micro frontend integration');
  console.log('\n🚀 Just run "npm run dev" and everything works!');
}

// Run the auto-discovery
autoDiscoverDevelopmentUrls().catch(console.error);

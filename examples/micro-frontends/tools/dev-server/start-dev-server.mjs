#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Apps configuration
const apps = [
  { name: 'authentication', port: 4200, path: '/authentication' },
  { name: 'landing', port: 4201, path: '/landing' },
  { name: 'user-profile', port: 4202, path: '/user-profile' },
  { name: 'dashboard', port: 4203, path: '/dashboard' },
];

const devServerPort = 3000;

// Start all apps
const processes = [];

log('🚀 Starting all micro-frontends...', 'bright');

for (const app of apps) {
  log(`Starting ${app.name} on port ${app.port}...`, 'cyan');

  const process = spawn('nx', ['dev', app.name], {
    cwd: rootDir,
    stdio: 'pipe',
    shell: true,
  });

  // Color code output by app
  const appColors = {
    authentication: 'green',
    landing: 'blue',
    'user-profile': 'magenta',
    dashboard: 'yellow',
  };

  process.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('Local:') || output.includes('ready')) {
      log(`[${app.name}] ${output.trim()}`, appColors[app.name] || 'reset');
    }
  });

  process.stderr.on('data', (data) => {
    const output = data.toString();
    if (!output.includes('DeprecationWarning')) {
      log(`[${app.name}] ${output.trim()}`, 'red');
    }
  });

  processes.push({ name: app.name, process });
}

// Start unified dev server immediately (apps will connect when ready)
// Reduced timeout for faster startup
log(`\n🌐 Starting unified dev server on port ${devServerPort}...`, 'bright');
log(`All apps will be available at http://localhost:${devServerPort}`, 'green');

const devServer = spawn(
  'vite',
  [
    '--config',
    join(__dirname, 'vite.config.ts'),
    '--clearScreen',
    'false',
    '--force', // Force optimize dependencies
  ],
  {
    cwd: rootDir,
    stdio: 'inherit', // Use inherit for better performance
    shell: true,
  },
);

// Handle cleanup on exit
const cleanup = () => {
  log('\n🛑 Shutting down all servers...', 'yellow');
  processes.forEach(({ process }) => {
    process.kill();
  });
  devServer.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

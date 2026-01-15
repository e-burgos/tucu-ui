/* eslint-disable @nx/enforce-module-boundaries */
/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import { generateViteConfigBase } from '../../tools/apps-config/vite-base-config';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const config = {
    name: 'authentication',
    port: parseInt(env.VITE_APP_AUTHENTICATION_PORT) || 4200,
    modulePath: __dirname,
    env,
  };

  return await generateViteConfigBase(config);
});

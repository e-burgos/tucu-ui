/* eslint-disable @nx/enforce-module-boundaries */
/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import { generateViteConfigBase } from '../../tools/apps-config/vite-base-config';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const config = {
    name: 'user-profile',
    port: parseInt(env.VITE_APP_USER_PROFILE_PORT) || 4202,
    modulePath: __dirname,
    env,
  };

  return await generateViteConfigBase(config);
});

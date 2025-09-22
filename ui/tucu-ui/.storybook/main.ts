import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../src/assets'],
  addons: [
    '@chromatic-com/storybook',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  docs: {
    defaultName: 'Documentation',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop) =>
        prop.parent
          ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName)
          : true,
    },
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
      resolve: {
        alias: {
          '@/lucide-react': path.resolve(__dirname, '../src/lucide-react'),
          '@/react-router': path.resolve(__dirname, '../src/react-router'),
        },
      },
      optimizeDeps: {
        include: [
          'lodash',
          'tailwindcss',
          'react-router',
          'lucide-react-dom',
          'react-hook-form',
          'react-dropzone',
          'swiper/modules',
          'swiper/react',
          'framer-motion',
          'zustand',
          '@headlessui/react',
          'recharts',
          'react-use',
        ],
      },
      build: {
        sourcemap: true,
        reportCompressedSize: true,
        chunkSizeWarningLimit: 10000,
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      },
    });
  },
};
export default config;

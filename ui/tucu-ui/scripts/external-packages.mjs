export const EXTERNAL_PACKAGES = [
  'react',
  'react-dom',
  'lucide-react',
  'react-router-dom',
  '@dnd-kit/core',
  '@dnd-kit/modifiers',
  '@dnd-kit/sortable',
  '@dnd-kit/utilities',
  '@tanstack/react-table',
  'classnames',
  'framer-motion',
  'lodash-es',
  'react-hook-form',
  'recharts',
  'swiper',
  'zustand',
  'prismjs',
  'next',
];

export const isExternalPackage = (id) =>
  EXTERNAL_PACKAGES.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));

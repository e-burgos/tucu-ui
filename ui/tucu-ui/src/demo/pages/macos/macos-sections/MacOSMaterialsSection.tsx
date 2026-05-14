import React from 'react';
import { CardContainer, CardTitle, Typography } from '../../../../index';
import { useTheme } from '../../../../themes';

interface MaterialSpec {
  name: string;
  opacity: number;
  blur: number;
  lightBg: string;
  darkBg: string;
  desc: string;
}

const materials: MaterialSpec[] = [
  {
    name: 'UltraThin',
    opacity: 0.36,
    blur: 15,
    lightBg: 'rgba(246, 246, 248, 0.36)',
    darkBg: 'rgba(28, 28, 30, 0.36)',
    desc: 'Maximum translucency — content behind is clearly visible',
  },
  {
    name: 'Thin',
    opacity: 0.48,
    blur: 15,
    lightBg: 'rgba(246, 246, 248, 0.48)',
    darkBg: 'rgba(28, 28, 30, 0.48)',
    desc: 'High translucency — subtle tinting of background content',
  },
  {
    name: 'Medium',
    opacity: 0.6,
    blur: 15,
    lightBg: 'rgba(246, 246, 248, 0.60)',
    darkBg: 'rgba(28, 28, 30, 0.60)',
    desc: 'Balanced — background content is muted but perceptible',
  },
  {
    name: 'Thick',
    opacity: 0.72,
    blur: 15,
    lightBg: 'rgba(246, 246, 248, 0.72)',
    darkBg: 'rgba(40, 40, 42, 0.72)',
    desc: 'Low translucency — subtle depth hint from background',
  },
  {
    name: 'UltraThick',
    opacity: 0.84,
    blur: 15,
    lightBg: 'rgba(246, 246, 248, 0.84)',
    darkBg: 'rgba(44, 44, 46, 0.84)',
    desc: 'Near-opaque — minimal translucency, maximum legibility',
  },
];

const namedMaterials = {
  light: [
    {
      name: 'Sidebar',
      css: 'var(--macos-material-sidebar)',
      blur: '20px',
      value: 'rgba(246, 246, 248, 0.82)',
    },
    {
      name: 'Toolbar',
      css: 'var(--macos-material-toolbar)',
      blur: '16px',
      value: 'rgba(255, 255, 255, 0.72)',
    },
    {
      name: 'Popover',
      css: 'var(--macos-material-popover)',
      blur: '24px',
      value: 'rgba(255, 255, 255, 0.9)',
    },
    {
      name: 'Sheet',
      css: 'var(--macos-material-sheet)',
      blur: '30px',
      value: 'rgba(255, 255, 255, 0.94)',
    },
  ],
  dark: [
    {
      name: 'Sidebar',
      css: 'var(--macos-material-sidebar)',
      blur: '20px',
      value: 'rgba(28, 28, 30, 0.85)',
    },
    {
      name: 'Toolbar',
      css: 'var(--macos-material-toolbar)',
      blur: '16px',
      value: 'rgba(40, 40, 42, 0.8)',
    },
    {
      name: 'Popover',
      css: 'var(--macos-material-popover)',
      blur: '24px',
      value: 'rgba(44, 44, 46, 0.92)',
    },
    {
      name: 'Sheet',
      css: 'var(--macos-material-sheet)',
      blur: '30px',
      value: 'rgba(44, 44, 46, 0.96)',
    },
  ],
};

const MacOSMaterialsSection: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const currentNamed = isDark ? namedMaterials.dark : namedMaterials.light;
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Materials
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          macOS vibrancy materials combine translucency and blur to provide
          depth and context. Content behind the material informs the user of
          spatial hierarchy.
        </Typography>
      </div>

      {/* Material Levels */}
      <CardContainer className="overflow-hidden">
        <CardTitle title="Material Levels" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-6"
            >
              Five translucency levels from UltraThin (most transparent) to
              UltraThick (near-opaque). All use backdrop-filter blur for the
              frosted-glass effect.
            </Typography>
            <div
              className="relative rounded-xl overflow-hidden p-6"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
                minHeight: '400px',
              }}
            >
              {/* Colorful background pattern */}
              <div className="absolute inset-0 opacity-60">
                {isDark ? (
                  <>
                    <div className="absolute top-6 left-8 w-20 h-20 rounded-full bg-purple-600" />
                    <div className="absolute top-12 right-16 w-28 h-28 rounded-full bg-indigo-600" />
                    <div className="absolute bottom-6 left-1/3 w-16 h-16 rounded-full bg-blue-600" />
                    <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-violet-700" />
                  </>
                ) : (
                  <>
                    <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-yellow-300" />
                    <div className="absolute top-16 right-12 w-32 h-32 rounded-full bg-pink-400" />
                    <div className="absolute bottom-8 left-1/4 w-20 h-20 rounded-full bg-green-400" />
                    <div className="absolute bottom-4 right-8 w-28 h-28 rounded-full bg-blue-300" />
                  </>
                )}
              </div>

              {/* Material panels */}
              <div className="relative flex flex-col gap-4">
                {materials.map((mat) => (
                  <div
                    key={mat.name}
                    className="rounded-xl p-4 border border-white/20"
                    style={{
                      backgroundColor: isDark ? mat.darkBg : mat.lightBg,
                      backdropFilter: `blur(${mat.blur}px)`,
                      WebkitBackdropFilter: `blur(${mat.blur}px)`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className={`text-sm font-semibold ${
                            isDark ? 'text-gray-100' : 'text-gray-800'
                          }`}
                        >
                          {mat.name}
                        </span>
                        <p
                          className={`text-xs mt-0.5 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {mat.desc}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-mono ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          opacity: {mat.opacity}
                        </span>
                        <br />
                        <span
                          className={`text-xs font-mono ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          blur: {mat.blur}px
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* Named Materials */}
      <CardContainer className="overflow-hidden">
        <CardTitle
          title="Named Materials (CSS Variables)"
          className="mt-2 mb-2"
        >
          <div className="w-full p-4 sm:p-6">
            <Typography
              tag="p"
              className="text-sm text-gray-500 dark:text-gray-400 mb-4"
            >
              Pre-defined materials for common macOS surfaces. Each maps to a
              CSS custom property. Showing {isDark ? 'dark' : 'light'} mode
              values.
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentNamed.map((mat) => (
                <div
                  key={mat.name}
                  className="rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
                      : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)',
                  }}
                >
                  <div
                    className="rounded-lg p-4 border border-white/30 dark:border-white/10"
                    style={{
                      backgroundColor: mat.value,
                      backdropFilter: `blur(${mat.blur})`,
                      WebkitBackdropFilter: `blur(${mat.blur})`,
                    }}
                  >
                    <span
                      className={`text-sm font-semibold ${
                        isDark ? 'text-gray-100' : 'text-gray-800'
                      }`}
                    >
                      {mat.name}
                    </span>
                    <div className="mt-2 space-y-1">
                      <p
                        className={`text-[10px] font-mono ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {mat.css}
                      </p>
                      <p
                        className={`text-[10px] font-mono ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        blur: {mat.blur}
                      </p>
                      <p
                        className={`text-[10px] font-mono ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {mat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MacOSMaterialsSection;

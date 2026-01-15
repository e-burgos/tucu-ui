import {
  MfeAppThemeProvider,
  MfeAppThemeProviderProps,
} from './mfe-app-theme-provider';
import StandaloneAppThemeProvider, {
  StandaloneAppProviderProps,
} from './standalone-app-theme-provider';

type ArchitecturalPatterns = 'standalone' | 'mfe';

/**
 * Props for Standalone Application architecture pattern.
 * Requires menuItems and optionally customRoutes.
 */
type StandaloneAppThemeProviderProps = StandaloneAppProviderProps & {
  architecturalPatterns?: ArchitecturalPatterns;
};

/**
 * Props for Micro Frontend (MFE) architecture pattern.
 * Requires basePath and appRoutesConfig.
 */
type MfeThemeProviderProps = MfeAppThemeProviderProps & {
  architecturalPatterns: ArchitecturalPatterns;
};

/**
 * Conditional type for ThemeProvider that changes required props based on architecturalPatterns.
 */
type ThemeProviderProps =
  | StandaloneAppThemeProviderProps
  | MfeThemeProviderProps;

/**
 * ThemeProvider component that supports two architectural patterns:
 * - Standalone Application (default): Uses menuItems and optional customRoutes
 * - Micro Frontend (MFE): Uses basePath and appRoutesConfig
 *
 * The type system ensures you provide the correct props for each pattern.
 *
 * @example
 * // Standalone App Pattern (default)
 * <ThemeProvider
 *   menuItems={[...]}
 *   customRoutes={<Routes>...</Routes>}
 * />
 *
 * @example
 * // MFE Pattern
 * <ThemeProvider
 *   architecturalPatterns="mfe"
 *   basePath="/app"
 *   isAuthenticated={true}
 *   appRoutesConfig={[...]}
 *   menuItems={[...]}
 * />
 */

// Function overload for Standalone App Pattern
export function ThemeProvider(
  props: StandaloneAppThemeProviderProps
): JSX.Element;

// Function overload for MFE Pattern
export function ThemeProvider(props: MfeThemeProviderProps): JSX.Element;

// Implementation signature
export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const architecturalPatterns = props.architecturalPatterns ?? 'standalone';

  if (architecturalPatterns === 'standalone') {
    const standaloneAppProps = props as StandaloneAppProviderProps;
    return <StandaloneAppThemeProvider {...standaloneAppProps} />;
  }

  const mfeAppProps = props as MfeAppThemeProviderProps;
  return <MfeAppThemeProvider {...mfeAppProps} />;
}

export default ThemeProvider;

export type {
  ThemeProviderProps,
  StandaloneAppThemeProviderProps,
  MfeThemeProviderProps,
  MfeAppThemeProviderProps,
  StandaloneAppProviderProps,
  ArchitecturalPatterns,
};

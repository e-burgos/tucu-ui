/**
 * Examples demonstrating conditional typing in ThemeProvider
 * based on architecturalPatterns
 */

export const StandaloneAppExample = `import { ThemeProvider, LucideIcons } from '@e-burgos/tucu-ui';
import '@e-burgos/tucu-ui/styles';

function App() {
  // Single App Pattern (default)
  // TypeScript will require: menuItems, and optionally customRoutes
  // TypeScript will NOT allow: basePath or appRoutesConfig
  
  return (
    <ThemeProvider
      // architecturalPatterns="single" is optional (default)
      showSettings
      logo={{
        name: 'My',
        secondName: 'App',
      }}
      menuItems={[
        {
          name: 'Home',
          path: '/',
          icon: <LucideIcons.Home />,
          component: <Home />,
        },
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: <LucideIcons.LayoutDashboard />,
          component: <Dashboard />,
        },
      ]}
      // customRoutes is optional for more control
      customRoutes={
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      }
    />
  );
}

export default App;
`;

export const MfeAppExample = `import { ThemeProvider } from '@e-burgos/tucu-ui';
import '@e-burgos/tucu-ui/styles';

function App() {
  // MFE Pattern
  // TypeScript will require: architecturalPatterns="mfe", basePath, appRoutesConfig
  // TypeScript will NOT allow: menuItems or customRoutes
  
  return (
    <ThemeProvider
      architecturalPatterns="mfe"
      basePath="/my-app"
      appRoutesConfig={[
        {
          key: 'home',
          path: '/',
          element: <Home />,
          isPublic: true,
        },
        {
          key: 'dashboard',
          path: '/dashboard',
          element: <Dashboard />,
          isPublic: false,
        },
        {
          key: 'settings',
          path: '/settings',
          element: <Settings />,
          disabled: false,
        },
      ]}
      showSettings
      logo={{
        name: 'My',
        secondName: 'MFE',
      }}
    />
  );
}

export default App;
`;

export const ConditionalTypingExplanation = `
# Conditional Typing in ThemeProvider

The ThemeProvider uses TypeScript discriminated unions to provide different prop requirements based on the \`architecturalPatterns\` prop.

## How It Works

The type system uses a discriminated union:

\`\`\`typescript
type StandaloneAppThemeProviderProps = StandaloneAppProviderProps & {
  architecturalPatterns?: 'single';
};

type MfeThemeProviderProps = MfeAppThemeProviderProps & {
  architecturalPatterns: 'mfe';
};

type ThemeProviderProps = StandaloneAppThemeProviderProps | MfeThemeProviderProps;
\`\`\`

## Benefits

### 1. Type Safety
- **Single App**: TypeScript enforces \`menuItems\` and allows \`customRoutes\`
- **MFE**: TypeScript enforces \`basePath\` and \`appRoutesConfig\`

### 2. IntelliSense Support
When you type \`architecturalPatterns="mfe"\`, your IDE will automatically:
- Show only relevant props (\`basePath\`, \`appRoutesConfig\`)
- Hide irrelevant props (\`menuItems\`, \`customRoutes\`)
- Provide autocomplete for the correct props

### 3. Compile-Time Errors
Invalid combinations will fail at compile time:

\`\`\`typescript
// ❌ This will fail - mixing MFE pattern with Single App props
<ThemeProvider
  architecturalPatterns="mfe"
  menuItems={[...]}  // Error: Property 'menuItems' does not exist
/>

// ❌ This will fail - MFE pattern requires basePath and appRoutesConfig
<ThemeProvider
  architecturalPatterns="mfe"
  // Error: Property 'basePath' is missing
/>

// ✅ This is correct - MFE pattern with required props
<ThemeProvider
  architecturalPatterns="mfe"
  basePath="/app"
  appRoutesConfig={[...]}
/>

// ✅ This is correct - Single App pattern (default)
<ThemeProvider
  menuItems={[...]}
/>
\`\`\`

## Pattern Selection

### Use Single App Pattern when:
- Building a standalone application
- You want automatic route generation from menuItems
- You need simple navigation structure
- Default pattern (no \`architecturalPatterns\` prop needed)

### Use MFE Pattern when:
- Building a micro-frontend architecture
- You need explicit route configuration
- You want to integrate multiple apps with a base path
- You need granular control over route access (isPublic, disabled)

## Advanced Usage

### Single App with Custom Routes
\`\`\`typescript
<ThemeProvider
  menuItems={menuConfig}
  customRoutes={
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  }
/>
\`\`\`

### MFE with Route Guards
\`\`\`typescript
<ThemeProvider
  architecturalPatterns="mfe"
  basePath="/admin"
  appRoutesConfig={[
    {
      key: 'public-home',
      path: '/',
      element: <Home />,
      isPublic: true,  // No authentication required
    },
    {
      key: 'private-dashboard',
      path: '/dashboard',
      element: <Dashboard />,
      isPublic: false,  // Authentication required
    },
    {
      key: 'disabled-feature',
      path: '/beta-feature',
      element: <BetaFeature />,
      disabled: true,  // Temporarily disabled
    },
  ]}
/>
\`\`\`
`;

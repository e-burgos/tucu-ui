import { lazy } from 'react';
import { LucideIcons, HeroCard } from '@e-burgos/tucu-ui';
import { DynamicSectionsPage, type SectionConfig } from '@e-burgos/tucu-ui';

const sections: SectionConfig[] = [
  { id: 'overview', label: 'Overview', component: lazy(() => import('./mcp-sections/OverviewSection')) },
  { id: 'installation', label: 'Installation & Setup', component: lazy(() => import('./mcp-sections/InstallationSection')) },
  { id: 'tools', label: 'Tools', component: lazy(() => import('./mcp-sections/ToolsSection')) },
  { id: 'resources', label: 'Resources', component: lazy(() => import('./mcp-sections/ResourcesSection')) },
  { id: 'prompts', label: 'Prompts', component: lazy(() => import('./mcp-sections/PromptsSection')) },
  { id: 'client-config', label: 'Client Configuration', component: lazy(() => import('./mcp-sections/ClientConfigSection')) },
  { id: 'deployment', label: 'Self-Hosting & Deployment', component: lazy(() => import('./mcp-sections/DeploymentSection')) },
  { id: 'security', label: 'Security', component: lazy(() => import('./mcp-sections/SecuritySection')) },
];

export function MCPServerPage() {
  return (
    <DynamicSectionsPage
      hideHeroInSubSections
      sections={sections}
      hero={
        <HeroCard
          title="MCP Server"
          description="Model Context Protocol server for tucu-ui. Gives AI assistants access to the component catalog, code generation, design tokens, and best practices — enabling agents to produce correct, type-safe UI code on the first try."
          githubButton
          getStartedButton
          docsButton="introduction"
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg border border-violet-500/50">
              <LucideIcons.BrainCircuit className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default MCPServerPage;

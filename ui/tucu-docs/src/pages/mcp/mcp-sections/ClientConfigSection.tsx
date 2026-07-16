import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Badge,
} from '@e-burgos/tucu-ui';

const ClientConfigSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Client Configuration"
        description="Connect the MCP server to your preferred AI assistant. Supports VS Code, Cursor, Claude Desktop, and any MCP-compatible client."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Settings className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="VS Code (GitHub Copilot / Continue)">
          <Typography className="text-sm text-foreground/70 mb-3">
            Create{' '}
            <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
              .vscode/mcp.json
            </code>{' '}
            in your project root:
          </Typography>
          <CodeBlock
            code={`{
  "servers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["@e-burgos/tucu-ui-mcp"],
      "env": {}
    }
  }
}`}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Cursor">
          <Typography className="text-sm text-foreground/70 mb-3">
            Create{' '}
            <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
              .cursor/mcp.json
            </code>{' '}
            in your project root:
          </Typography>
          <CodeBlock
            code={`{
  "mcpServers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["@e-burgos/tucu-ui-mcp"],
      "env": {}
    }
  }
}`}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Claude Desktop">
          <Typography className="text-sm text-foreground/70 mb-3">
            Edit the Claude Desktop config file:
          </Typography>
          <div className="mb-3">
            <Badge variant="outline" className="text-xs">
              macOS
            </Badge>
            <Typography className="text-xs text-foreground/50 mt-1 font-mono">
              ~/Library/Application Support/Claude/claude_desktop_config.json
            </Typography>
          </div>
          <div className="mb-3">
            <Badge variant="outline" className="text-xs">
              Windows
            </Badge>
            <Typography className="text-xs text-foreground/50 mt-1 font-mono">
              %APPDATA%\Claude\claude_desktop_config.json
            </Typography>
          </div>
          <CodeBlock
            code={`{
  "mcpServers": {
    "tucu-ui": {
      "command": "npx",
      "args": ["@e-burgos/tucu-ui-mcp"],
      "env": {}
    }
  }
}`}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Remote HTTP (Fly.io / Self-hosted)">
          <Typography className="text-sm text-foreground/70 mb-3">
            Connect to a remote MCP server instance via HTTP+SSE transport:
          </Typography>
          <CodeBlock
            code={`{
  "servers": {
    "tucu-ui-remote": {
      "url": "https://tucu-ui-mcp.fly.dev/sse",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_API_KEY"
      }
    }
  }
}`}
          />
          <div className="mt-3 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <div className="flex items-center gap-2">
              <LucideIcons.AlertTriangle className="w-4 h-4 text-amber-500" />
              <Typography className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                Always use HTTPS and keep your API key secret. Never commit keys
                to version control.
              </Typography>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Verify Connection">
          <Typography className="text-sm text-foreground/70 mb-3">
            After configuring, test the connection by asking your AI assistant:
          </Typography>
          <CodeBlock
            code={`// Ask your AI assistant:
"List all tucu-ui components in the 'form' category"

// If configured correctly, the agent will call:
// Tool: list_components({ category: "form" })
// And return real component data from the MCP server`}
          />
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default ClientConfigSection;

import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Badge,
  BasicTable,
} from '../../../../index';

const InstallationSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Installation & Setup"
        description="Get the MCP server running in seconds — use npx for zero-install, or install globally for persistent use."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Download className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Quick Start (npx)">
          <Typography className="text-sm text-foreground/70 mb-3">
            Run directly without installing — perfect for trying it out or CI
            environments:
          </Typography>
          <CodeBlock
            code={`# Start in stdio mode (for IDE integration)
npx @e-burgos/tucu-ui-mcp

# Start in HTTP mode (for remote agents)
npx @e-burgos/tucu-ui-mcp --http --port 3100`}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Global Install">
          <Typography className="text-sm text-foreground/70 mb-3">
            Install globally for faster startup and permanent availability:
          </Typography>
          <CodeBlock
            code={`# Install globally
npm install -g @e-burgos/tucu-ui-mcp

# Now available as binary commands:
tucu-ui-mcp          # stdio transport (local IDE)
tucu-ui-mcp-http     # HTTP+SSE transport (port 3100)`}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Binary Commands">
          <BasicTable
            columns={[
              {
                key: 'command',
                label: 'Command',
                render: (value: unknown) => (
                  <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
                    {String(value)}
                  </code>
                ),
              },
              {
                key: 'transport',
                label: 'Transport',
                render: (value: unknown) => (
                  <Badge
                    variant="soft"
                    className={
                      String(value) === 'stdio'
                        ? 'bg-blue-500/10 text-blue-500'
                        : 'bg-purple-500/10 text-purple-500'
                    }
                  >
                    {String(value)}
                  </Badge>
                ),
              },
              { key: 'useCase', label: 'Use Case' },
            ]}
            data={[
              {
                command: 'tucu-ui-mcp',
                transport: 'stdio',
                useCase: 'VS Code, Cursor, Claude Desktop (local)',
              },
              {
                command: 'tucu-ui-mcp-http',
                transport: 'HTTP+SSE',
                useCase: 'Remote agents, Docker, Fly.io, cloud',
              },
            ]}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="npm Package">
          <div className="flex items-center gap-3 mb-3">
            <LucideIcons.ExternalLink className="w-4 h-4 text-foreground/50" />
            <Typography className="text-sm text-foreground/70">
              <a
                href="https://www.npmjs.com/package/@e-burgos/tucu-ui-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                npmjs.com/package/@e-burgos/tucu-ui-mcp
              </a>
            </Typography>
          </div>
          <CodeBlock
            code={`{
  "name": "@e-burgos/tucu-ui-mcp",
  "version": "1.0.0",
  "bin": {
    "tucu-ui-mcp": "./dist/stdio.js",
    "tucu-ui-mcp-http": "./dist/http.js"
  }
}`}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Verify Installation">
          <Typography className="text-sm text-foreground/70 mb-3">
            Test that the server is working correctly:
          </Typography>
          <CodeBlock
            code={`# Test stdio transport (should output JSON-RPC response)
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"capabilities":{}}}' | tucu-ui-mcp

# Test HTTP transport
curl http://localhost:3100/health
# → {"status":"ok","version":"1.0.0"}`}
          />
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default InstallationSection;

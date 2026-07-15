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
} from '@e-burgos/tucu-ui';

const DeploymentSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Self-Hosting & Deployment"
        description="Deploy the MCP server to Docker, Fly.io, or any container platform for team-wide access."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Live Instance">
          <Typography className="text-sm text-foreground/70 mb-3">
            A public instance is available for testing and evaluation:
          </Typography>
          <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-3">
            <Badge
              variant="soft"
              className="bg-emerald-500/10 text-emerald-500"
            >
              LIVE
            </Badge>
            <code className="text-sm font-mono text-emerald-600 dark:text-emerald-400">
              https://tucu-ui-mcp.fly.dev
            </code>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Docker">
          <Typography className="text-sm text-foreground/70 mb-3">
            Run with Docker Compose or standalone:
          </Typography>
          <CodeBlock
            code={`# Using Docker Compose (recommended)
docker compose up -d

# Or build and run manually
docker build -t tucu-ui-mcp .
docker run -d \\
  --name tucu-ui-mcp \\
  -p 3100:3100 \\
  -e MCP_API_KEY=your-secret-key \\
  tucu-ui-mcp`}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Fly.io">
          <Typography className="text-sm text-foreground/70 mb-3">
            Deploy to Fly.io for a globally-distributed instance:
          </Typography>
          <CodeBlock
            code={`# Initial setup
fly launch --name tucu-ui-mcp --region iad

# Set secrets
fly secrets set MCP_API_KEY=your-secret-key

# Deploy
fly deploy

# Check status
fly status
fly logs`}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Environment Variables">
          <BasicTable
            columns={[
              {
                key: 'variable',
                label: 'Variable',
                render: (value: unknown) => (
                  <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
                    {String(value)}
                  </code>
                ),
              },
              { key: 'default', label: 'Default' },
              { key: 'description', label: 'Description' },
            ]}
            data={[
              {
                variable: 'PORT',
                default: '3100',
                description: 'HTTP server port',
              },
              {
                variable: 'MCP_API_KEY',
                default: '—',
                description:
                  'Bearer token for authentication (required in production)',
              },
              {
                variable: 'NODE_ENV',
                default: 'production',
                description: 'Environment mode',
              },
              {
                variable: 'RATE_LIMIT_MAX',
                default: '100',
                description: 'Max requests per minute per IP',
              },
            ]}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Docker Compose File">
          <Typography className="text-sm text-foreground/70 mb-3">
            Reference{' '}
            <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
              docker-compose.yml
            </code>
            :
          </Typography>
          <CodeBlock
            code={`version: '3.8'
services:
  mcp-server:
    build: .
    ports:
      - "3100:3100"
    environment:
      - PORT=3100
      - MCP_API_KEY=\${MCP_API_KEY}
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3100/health"]
      interval: 30s
      timeout: 10s
      retries: 3`}
          />
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default DeploymentSection;

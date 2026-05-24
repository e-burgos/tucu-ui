import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Badge,
  FeatureCard,
} from '../../../../index';

const SecuritySection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Security"
        description="Authentication, rate limiting, and hardening measures for production deployments."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Bearer Token Authentication">
          <Typography className="text-sm text-foreground/70 mb-3">
            The HTTP transport requires a Bearer token when{' '}
            <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
              MCP_API_KEY
            </code>{' '}
            is set. All requests must include the Authorization header:
          </Typography>
          <CodeBlock
            code={`# Set the API key on the server
export MCP_API_KEY="your-secure-random-string"

# Clients must send:
Authorization: Bearer your-secure-random-string

# Generate a secure key:
openssl rand -base64 32`}
          />
          <div className="mt-3 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <div className="flex items-start gap-2">
              <LucideIcons.AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />
              <Typography className="text-xs text-amber-600 dark:text-amber-400">
                If <code className="font-mono">MCP_API_KEY</code> is not set,
                the server runs without auth — only suitable for local/stdio
                usage.
              </Typography>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Rate Limiting">
          <Typography className="text-sm text-foreground/70 mb-3">
            Built-in rate limiting protects the server from abuse:
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg border border-border bg-muted/30 text-center">
              <Typography className="text-2xl font-bold text-foreground">
                100
              </Typography>
              <Typography className="text-xs text-foreground/50">
                requests/min per IP
              </Typography>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30 text-center">
              <Typography className="text-2xl font-bold text-foreground">
                429
              </Typography>
              <Typography className="text-xs text-foreground/50">
                status when exceeded
              </Typography>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30 text-center">
              <Typography className="text-2xl font-bold text-foreground">
                60s
              </Typography>
              <Typography className="text-xs text-foreground/50">
                window reset
              </Typography>
            </div>
          </div>
          <CodeBlock
            code={`// Rate limit response when exceeded:
HTTP/1.1 429 Too Many Requests
Retry-After: 60
Content-Type: application/json

{ "error": "Rate limit exceeded. Try again in 60 seconds." }`}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Timing-Safe Comparison">
          <Typography className="text-sm text-foreground/70 mb-3">
            Token validation uses constant-time comparison to prevent timing
            attacks:
          </Typography>
          <CodeBlock
            code={`import { timingSafeEqual } from 'node:crypto';

function verifyToken(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}`}
          />
        </CardTitle>
      </CardContainer>

      <section className="space-y-6">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Infrastructure Security
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Docker hardening and HTTPS enforcement for production deployments
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            layout="vertical"
            icon={
              <LucideIcons.User className="w-6 h-6 text-white filter drop-shadow-sm" />
            }
            title="Non-Root User"
            description="Runs as node user (UID 1000) — never as root"
            iconBgClassName="from-blue-500 to-indigo-500"
          />
          <FeatureCard
            layout="vertical"
            icon={
              <LucideIcons.Layers className="w-6 h-6 text-white filter drop-shadow-sm" />
            }
            title="Multi-Stage Build"
            description="Only production deps in final Alpine-based image"
            iconBgClassName="from-emerald-500 to-teal-500"
          />
          <FeatureCard
            layout="vertical"
            icon={
              <LucideIcons.Lock className="w-6 h-6 text-white filter drop-shadow-sm" />
            }
            title="Auto TLS"
            description="Automatic certificate provisioning and HTTP→HTTPS redirect"
            iconBgClassName="from-violet-500 to-purple-500"
          />
          <FeatureCard
            layout="vertical"
            icon={
              <LucideIcons.KeyRound className="w-6 h-6 text-white filter drop-shadow-sm" />
            }
            title="Encrypted Secrets"
            description="Secrets stored encrypted at rest with fly secrets"
            iconBgClassName="from-rose-500 to-red-500"
          />
        </div>
      </section>

      <CardContainer>
        <CardTitle title="Security Checklist">
          <Typography className="text-sm text-foreground/70 mb-3">
            Before deploying to production, ensure:
          </Typography>
          <CodeBlock
            code={`✓ MCP_API_KEY is set to a strong random value (32+ chars)
✓ HTTPS is enforced (automatic on Fly.io)
✓ Rate limiting is enabled (default: 100 req/min)
✓ Docker runs as non-root user
✓ No secrets in source code or Docker image layers
✓ Fly.io secrets set via 'fly secrets set' (not env files)
✓ Health endpoint (/health) does not expose internals
✓ CORS restricted to known origins in production`}
          />
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default SecuritySection;

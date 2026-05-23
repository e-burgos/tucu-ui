import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerComponentTools } from './tools/component-tools.js';
import { registerGenerationTools } from './tools/generation-tools.js';

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'tucu-ui-mcp',
    version: '0.2.0',
  });

  registerComponentTools(server);
  registerGenerationTools(server);

  return server;
}

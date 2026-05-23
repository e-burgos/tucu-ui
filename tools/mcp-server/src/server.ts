import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerComponentTools } from './tools/component-tools.js';

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'tucu-ui-mcp',
    version: '0.1.0',
  });

  registerComponentTools(server);

  return server;
}

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerComponentTools } from './tools/component-tools.js';
import { registerGenerationTools } from './tools/generation-tools.js';
import { registerResources } from './resources/index.js';
import { registerPrompts } from './prompts/index.js';

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'tucu-ui-mcp',
    version: '0.4.0',
  });

  registerComponentTools(server);
  registerGenerationTools(server);
  registerResources(server);
  registerPrompts(server);

  return server;
}

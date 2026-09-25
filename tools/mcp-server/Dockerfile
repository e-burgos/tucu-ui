FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json ./
# --legacy-peer-deps: npm 10's arborist crashes ("reading 'edgesOut'") while
# resolving vitest 4.x peer sets; peers aren't needed to compile the server.
RUN npm install --legacy-peer-deps
COPY tsconfig.docker.json ./tsconfig.json
COPY src/ ./src/
RUN npx tsc -p tsconfig.json
# Drop devDependencies so the runtime stage only ships production modules.
RUN npm prune --omit=dev --legacy-peer-deps

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Security: non-root user
RUN addgroup -g 1001 -S mcpuser && \
    adduser -S mcpuser -u 1001 -G mcpuser

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

USER mcpuser
EXPOSE 3100

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3100/health || exit 1

CMD ["node", "dist/http-server.js"]

FROM node:20-alpine AS builder
WORKDIR /workspace

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
ARG APP=example-app
RUN pnpm exec nx build "$APP" --configuration=production

FROM nginx:1.27-alpine
ARG APP=example-app

COPY apps/${APP}/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /workspace/dist/apps/${APP} /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK CMD wget -q --spider http://localhost/ || exit 1

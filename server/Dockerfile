# ============================================
# Server Dockerfile (Node.js API in Monorepo)
# IMPORTANTE: O build context deve ser a raiz do projeto.
# Ex: docker build -f server/Dockerfile .
# ============================================

ARG NODE_VERSION=24-alpine
FROM node:${NODE_VERSION} AS base
WORKDIR /app

FROM base AS dependencies

COPY package.json package-lock.json ./

COPY client/package.json ./client/
COPY server/package.json ./server/

RUN npm ci --no-audit --no-fund

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN npm run build --workspace=server

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3333

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 node_runner

USER node_runner

COPY --from=builder --chown=node_runner:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=node_runner:nodejs /app/server/package.json ./server/
COPY --from=builder --chown=node_runner:nodejs /app/server/dist ./server/dist

EXPOSE 3333

CMD ["node", "server/dist/server.js"]

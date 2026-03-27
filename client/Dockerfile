# ============================================
# Client Dockerfile (Next.js Standalone in Monorepo)
# IMPORTANTE: O build context deve ser a raiz do projeto, não a pasta client.
# Ex: docker build -f client/Dockerfile .
# ============================================

ARG NODE_VERSION=24-alpine
FROM node:${NODE_VERSION} AS base
WORKDIR /app

# Stage 1: Dependencies Installs Stage
FROM base AS dependencies

COPY package.json package-lock.json ./

COPY client/package.json ./client/
COPY server/package.json ./server/
RUN npm ci --no-audit --no-fund

# Stage 2: Builder Stage
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

ARG NEXT_PUBLIC_API
ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build --workspace=client

# Stage 3: Runner Stage
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/client/public ./client/public

# Copia o estático e o conteúdo standalone que respeita a estrutura monorepo
COPY --from=builder --chown=nextjs:nodejs /app/client/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/client/.next/static ./client/.next/static

EXPOSE 3000

# Next standalone exporta o server dentro da pasta do workspace
CMD ["node", "client/server.js"]
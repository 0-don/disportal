# Install dependencies only when needed
# Stage 0
FROM oven/bun AS deps
WORKDIR /app

COPY package.json ./
RUN bun --bun install
#############################################


# Rebuild the source code only when needed
# Stage 1
FROM oven/bun AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/bun.lockb ./bun.lockb


ARG DATABASE_URL
ARG SECERT
ARG VITE_SITE_NAME
ARG VITE_SITE_URL

ENV DATABASE_URL=$DATABASE_URL
ENV SECERT=$SECERT
ENV VITE_SITE_NAME=$VITE_SITE_NAME
ENV VITE_SITE_URL=$VITE_SITE_URL

RUN bun --bun run build
#############################################


# Production image, copy only production files
# Stage 2
FROM oven/bun AS prod

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/.vinxi ./.vinxi
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

ARG DATABASE_URL
ARG SECERT
ARG VITE_SITE_NAME
ARG VITE_SITE_URL

ENV DATABASE_URL=$DATABASE_URL
ENV SECERT=$SECERT
ENV VITE_SITE_NAME=$VITE_SITE_NAME
ENV VITE_SITE_URL=$VITE_SITE_URL

CMD ["bun", "--bun", "start"]
#############################################

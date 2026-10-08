FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY server ./server
COPY prisma ./prisma
CMD ["pnpm", "api:start"]

# 1단계: 빌드
FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
RUN pnpm build

# 2단계: 실행
FROM node:22-alpine
WORKDIR /app
RUN apk add --no-cache bash
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["pnpm", "start"]
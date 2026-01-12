# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn prisma generate
RUN yarn build

# Stage 2: Runner
FROM node:18-alpine AS runner
WORKDIR /app

# YouTube deps (crítico para yt-dlp)
RUN apk add --no-cache python3 py3-pip ffmpeg && \
    pip3 install --no-cache-dir yt-dlp

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["sh", "-c", "yarn prisma db push && yarn start"]

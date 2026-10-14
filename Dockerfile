# Stage 1: Build static assets
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Verify source assets, build production bundle, and verify dist output
RUN node scripts/verify-assets.mjs
RUN npm run build
RUN node scripts/verify-assets.mjs --dist

# Stage 2: Serve via Nginx
FROM nginx:1.27-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s --retries=3 --start-period=5s \
  CMD wget -qO- http://127.0.0.1:3000/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]

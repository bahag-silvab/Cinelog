FROM node:25-alpine AS builder

WORKDIR /api

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:25-alpine

WORKDIR /api

COPY package*.json .

RUN npm ci --only=production

COPY --from=builder /api/dist/ ./dist

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

CMD ["node", "dist/server.js"]
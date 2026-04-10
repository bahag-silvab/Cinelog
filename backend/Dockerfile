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

CMD ["node", "dist/server.js"]
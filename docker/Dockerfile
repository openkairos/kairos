# Base stage: shared dependency layer for faster rebuilds.
FROM node:24-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Development stage: container used by docker-compose during local work.
FROM base AS development

ENV NODE_ENV=development

COPY . .

# Build stage: compiles the TypeScript project into dist/.
FROM base AS build

COPY . .
RUN npm run build

# Production stage: minimal runtime image for distribution.
FROM node:24-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev
# Copies only the compiled output from the build stage into the runtime image.
COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]

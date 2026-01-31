# Multi-stage Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --silent --no-audit --no-fund
# Ensure docs are explicitly copied so they exist at build time
COPY _docs ./_docs
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Install runtime deps required by healthcheck and runtime
RUN apk add --no-cache curl

# Copy only the files needed to run
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/_docs ./_docs
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
EXPOSE 3000
CMD ["npm", "start"]
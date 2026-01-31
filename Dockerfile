# Multi-stage Dockerfile for Next.js application

# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy application code
COPY . .

# Build Next.js application
RUN npm run build

# Stage 2: Runtime stage
FROM node:20-alpine

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy package files from builder
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/package-lock.json* ./

# Install only production dependencies
RUN npm ci --legacy-peer-deps --only=production

# Copy built application and required source files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/components ./components
COPY --from=builder /app/app ./app

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=5 --start-period=30s \
  CMD curl -f http://localhost:3000 || exit 1

# Start application
CMD ["npm", "start"]

FROM node:20-alpine AS builder

WORKDIR /app

# Install additional required packages
RUN apk add --no-cache libc6-compat python3 make g++

# Build args for Next public envs
ARG NEXT_PUBLIC_API_URL

# Install dependencies first for better caching
COPY package*.json ./
# Use clean install for reproducible builds and include dev deps
RUN npm ci --include=dev

# Copy the rest of the application
COPY . .

# Set environment variables (NODE_ENV left unset to keep dev deps available during build)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build the application
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json

# Expose the port
EXPOSE 3000

# Set the command
CMD ["node", "server.js"]

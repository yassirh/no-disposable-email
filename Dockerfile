# Use official Node.js LTS image
FROM node:lts-bookworm-slim

WORKDIR /app

# Copy only package files first for better caching
COPY package.json package-lock.json* ./

# Install only production dependencies and clean npm cache
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi && npm cache clean --force

# Copy only necessary files (exclude tests, docs, etc.)
COPY . .
RUN rm -rf ./test ./tests ./docs ./README.md ./utility.test.js ./index.test.js

EXPOSE 3000
CMD ["npm", "start"]

# Use official Node.js LTS image
FROM node:alpine3.20

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

EXPOSE 3000
CMD ["npm", "start"]

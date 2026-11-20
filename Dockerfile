FROM node:22-slim AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "npm run db:migrate && npm run db:seed && npm run start:prod"]

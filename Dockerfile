FROM node:22-slim

WORKDIR /app

RUN apt-get update -y \
    && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run db:migrate && npm run db:seed && npm run start:prod"]

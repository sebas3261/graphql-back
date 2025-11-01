# Etapa 1: Compilación de TypeScript
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Instalar dependencias (incluyendo dev)
RUN npm install

# Compilar el código TypeScript a JavaScript
RUN npm run build

# Etapa 2: Imagen final (solo código compilado)
FROM node:22-alpine

WORKDIR /app

# Copiar dependencias y código compilado
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=4000

# Puerto expuesto
EXPOSE 4000

# Comando de arranque
CMD ["node", "dist/infrastructure/graphql/server.js"]

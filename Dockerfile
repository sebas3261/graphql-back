# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa final
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app ./

# Render inyecta automáticamente la variable PORT, no la fijes a mano
EXPOSE 4000

CMD ["node", "dist/infrastructure/graphql/server.js"]

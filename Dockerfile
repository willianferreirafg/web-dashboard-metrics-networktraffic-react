# estágio 1: buildar a aplicação React
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# estágio 2: servir os arquivos estáticos usando nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

## O React gera arquivos HTML/JS/CSS puros quando buildado (npm run build).
## No Docker, nós usamos o Node apenas para buildar esses arquivos (estágio 1)
## e depois jogamos tudo dentro de um servidor Nginx levíssimo para servir o usuário final (estágio 2).
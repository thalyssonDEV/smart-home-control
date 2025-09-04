# --- Estágio 1: Build (Construção) ---
# Usamos uma imagem do Node para construir o projeto
FROM node:20-alpine as build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package.json package-lock.json ./
RUN npm install

# Copia o resto do código do frontend
COPY . .

# Roda o comando de build para gerar os arquivos estáticos na pasta /app/dist
RUN npm run build

# --- Estágio 2: Production (Produção) ---
# Usamos uma imagem super leve do Nginx para servir os arquivos
FROM nginx:stable-alpine

# Copia os arquivos estáticos que foram gerados no estágio de build
# da pasta /app/dist do estágio anterior para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia nosso arquivo de configuração customizado do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# O comando para iniciar o Nginx já vem na imagem base

# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Instalar dockerize
RUN apk update && apk add wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    mv dockerize /usr/local/bin/ && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo de dependências (package.json e package-lock.json) para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código para o diretório de trabalho do container
COPY . .

# Exponha a porta que o backend usa (porta 3001)
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]

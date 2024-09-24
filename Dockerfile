# Use a imagem oficial do Node.js como base
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install --legacy-peer-deps

# Copie todo o código do projeto para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 3003

# Defina o comando padrão para rodar a aplicação em ambiente de produção
CMD ["npm", "run", "production"]

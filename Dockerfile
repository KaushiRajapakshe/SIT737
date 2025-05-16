FROM node:18.17.1

WORKDIR /app
COPY package*.json ./

RUN npm install --prefer-offline

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]

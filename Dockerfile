FROM node:18.17.1

WORKDIR /app
COPY package*.json ./

RUN npm install --prefer-offline

COPY . .

# EXPOSE 3041

CMD ["node", "index.js"]

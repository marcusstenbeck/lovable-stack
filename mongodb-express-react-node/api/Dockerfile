FROM node:8.9

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]

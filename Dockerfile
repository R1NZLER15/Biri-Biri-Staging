FROM node:12.18

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "main.js" ]

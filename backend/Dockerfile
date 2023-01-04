FROM node:latest

WORKDIR /app

COPY . /app

RUN npm i ts-node@latest

RUN npm install

EXPOSE 8081

CMD ["npm", "run", "start:app"]

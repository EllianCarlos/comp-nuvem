FROM node:16-alpine as auth

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./
COPY . .

RUN npm install

RUN npm run build

RUN npm install --omit=dev

CMD [ "node", "dist/auth/consumer.js" ]

######################################################

FROM node:16-alpine as data

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./
COPY . .

RUN npm install

RUN npm run build

RUN npm install --omit=dev

CMD [ "node", "dist/data/consumer.js" ]

######################################################

FROM node:16-alpine as report

WORKDIR /usr/src/app


COPY package*.json ./
COPY .env ./
COPY . .

RUN npm install

RUN npm run build

RUN npm install --omit=dev

CMD [ "node", "dist/report/controller/report.js" ]
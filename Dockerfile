FROM node:16-alpine as common

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./
COPY . .

RUN npm install

RUN npm run build

RUN npm install --omit=dev

CMD []
########################################################
FROM common as auth

CMD [ "node", "dist/auth/consumer.js" ]
######################################################
FROM common as data

CMD [ "node", "dist/data/consumer.js" ]
######################################################
FROM common as report

CMD [ "node", "dist/report/controller/reports.js" ]
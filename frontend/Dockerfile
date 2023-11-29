FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY next.config.js next.config.js

RUN npm i

COPY src src
COPY .next .next
COPY public public

CMD npm run dev
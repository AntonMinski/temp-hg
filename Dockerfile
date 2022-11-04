FROM node:16.14.2-alpine

WORKDIR /home/app

COPY package*.json .
# RUN npm install
COPY . .

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "run", "dev" ]
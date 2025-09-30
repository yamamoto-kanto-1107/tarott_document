FROM node:22-alpine

WORKDIR /usr/src/app

RUN corepack enable

COPY package*.json .
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

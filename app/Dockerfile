FROM node:22-alpine
WORKDIR /usr/src/app

RUN corepack enable
COPY package*.json yarn.lock ./
RUN yarn install --verbose

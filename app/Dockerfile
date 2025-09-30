FROM node:22-alpine

WORKDIR /usr/src/app

RUN corepack enable
RUN echo "first"

COPY package*.json .
# RUN yarn install
RUN echo "second"

COPY . .

RUN yarn build

RUN echo "third"

EXPOSE 3000

CMD ["yarn", "start"]

RUN echo "last"
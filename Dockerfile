FROM node:22-alpine AS builder

WORKDIR /src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

COPY .env .env

RUN yarn build

RUN yarn install --production --frozen-lockfile

EXPOSE 4001

CMD ["yarn", "start"]

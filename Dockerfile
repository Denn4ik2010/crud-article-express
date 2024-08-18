FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn compile

EXPOSE 3000

CMD ["yarn", "dev"]
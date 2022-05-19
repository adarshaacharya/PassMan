# more imperative approach yo by yo gar vanne
FROM node:alpine as react
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 3000
CMD [ "yarn", "dev"]

FROM node:lts-alpine3.19
WORKDIR /usr/src/next
RUN npm install yarn
ADD ./next .
RUN yarn install
WORKDIR /usr/src/scripts
COPY ./scripts .
FROM node:8
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN cd client && yarn --production && yarn build
WORKDIR /usr/src/app
RUN yarn --production
EXPOSE 5000
CMD [ "yarn", "start" ]
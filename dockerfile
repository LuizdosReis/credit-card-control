# base image
FROM node:12.2.0

RUN npm install -g @angular/cli

USER node

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json

# add app
COPY . /app

# start app
CMD npm install && npm start

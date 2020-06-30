FROM node:10

RUN apt-get install imagemagick

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .
RUN ls -a
# Building app
# RUN npm run build

# Running the app
CMD [ "npm", "run" ,"dev" ]
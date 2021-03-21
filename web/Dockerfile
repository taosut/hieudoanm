# A ubuntu:trusty box
FROM ubuntu:trusty
# Who(m) to blame if nothing works
LABEL maintainer "HIEU <hieumdoan@gmail.com>"
# Clear cache
ARG CACHEBUST=1
# Set NODE_ENV to production
ENV NODE_ENV production
# Install Google Chrome
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get clean
RUN apt-get install x11vnc xvfb fluxbox wget wmctrl curl build-essential software-properties-common gcc g++ make python -y
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get install google-chrome-stable -y
# Install Node.js
# RUN curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
# RUN bash nodesource_setup.sh
# RUN deb https://deb.nodesource.com/node_14.x focal main
# RUN deb-src https://deb.nodesource.com/node_14.x focal main
RUN apt install nodejs -y
RUN nodejs -v
RUN npm -v
# Install yarn
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -y
RUN apt-get install yarn -y
RUN yarn --version
# Install TypeScript
RUN yarn global add typescript @angular/cli
# Create WORKDIR
RUN mkdir -p /var/server/app
RUN mkdir -p /var/server/express
RUN mkdir -p /var/server/angular
# Set WORKDIR to express
WORKDIR /var/server/express
# COPY ALL to express
COPY express /var/server/express
COPY express/package.json /var/server/express/package.json
# Install && Build Server
RUN yarn install --production=false && yarn build
# Set WORKDIR to angular
WORKDIR /var/server/angular
# COPY ALL to angular
COPY angular /var/server/angular
COPY angular/package.json /var/server/angular/package.json
# Install Web
RUN yarn install --production=false && yarn build
# Set WORKDIR to express
WORKDIR /var/server/express
# Copy contents of `dist` folder to `app`
RUN cp -a /var/server/express/dist/. /var/server/app/
# Copy package.json
RUN cp /var/server/express/package.json /var/server/app/package.json
# Copy yarn.lock
RUN cp /var/server/express/yarn.lock /var/server/app/yarn.lock
# Set WORKDIR to app
WORKDIR /var/server/app
# Install node-gyp
RUN apt-get install -y node-gyp
# Install dependencies (if any) in package.json
RUN yarn install --ignore-engines
# Expose port from container so host can access $PORT
EXPOSE $PORT
# start the app on load
CMD ["npm", "start"]
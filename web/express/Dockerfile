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
RUN apt-get install -y x11vnc xvfb fluxbox wget wmctrl curl build-essential software-properties-common gcc g++ make python
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get -y install google-chrome-stable

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -y nodejs
RUN node -v
RUN npm -v

# Install yarn
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -y
RUN apt-get install yarn -y
RUN yarn --version

# Set WORKDIR
RUN mkdir -p /var/server/app
WORKDIR /var/server/app

# Copy contents of local folder to `WORKDIR`
COPY dist /var/server/app
COPY package.json /var/server/app/package.json
COPY yarn.lock /var/server/app/yarn.lock

RUN ls /var/server/app

RUN apt-get install -y node-gyp
# Install dependencies (if any) in package.json
RUN yarn install --ignore-engines

# expose port from container so host can access $PORT
EXPOSE $PORT

# start the app on load
CMD ["npm", "start"]
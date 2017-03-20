# Set node base image
FROM node:6.9.2

# File author / maintainer
MAINTAINER Stone Chen (dev@shitulv.com)

# Install nodemon
RUN npm install -g nodemon

# Set environment variables
ENV PORT 3000

COPY ./dev/api/root.js /usr/app/root.js
COPY ./docker/config/api.package.json /usr/app/package.json
COPY ./assets/Alipay/rsa_private_key.pem /usr/app/rsa_private_key.pem
WORKDIR /usr/app
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

# Internal port
EXPOSE $PORT

# Run app using node/nodemon
ENTRYPOINT ["node"]
CMD ["root.js"]

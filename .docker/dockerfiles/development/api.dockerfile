# Set node base image
FROM node:6.9.2

# File author / maintainer
MAINTAINER Stone Chen (dev@shitulv.com)

# Install nodemon
RUN npm install -g nodemon

# Set environment variables
ENV PORT 3000

# COPY ./dev/api.js /usr/app/api.js
COPY ./assets/Alipay/rsa_private_key.pem /usr/app/rsa_private_key.pem
COPY ./package.api.json /usr/app/package.json
WORKDIR /usr/app
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

# Internal port
EXPOSE $PORT

# Run app using node/nodemon
ENTRYPOINT ["node"]
CMD ["/usr/app/api.js"]

# docker run -d --net=api-network -p 3000:3000  --name api shitulv/api
# docker network connect web-network api

# Set base image
FROM node:6.9.1

MAINTAINER Stone Chen (dev@shitulv.com)

# Install nodemon
RUN npm install -g nodemon

# Set environment variables
ENV PORT 3000

COPY ./rsa_private_key.pem /usr/app/rsa_private_key.pem
COPY ./dev/api.js /usr/app/server.js
COPY ./package.api.json /usr/app/package.json
WORKDIR /usr/app
RUN npm install

# Internal port
EXPOSE $PORT

# Run app using nodemon
ENTRYPOINT ["nodemon"]
CMD ["/usr/app/server.js"]

# docker run -d --net=api-network -p 3000:3000  --name api shitulv/api
# docker network connect web-network api

# Set base image
FROM node:6.9.1

MAINTAINER Stone Chen (dev@shitulv.com)

# Install nodemon
RUN npm install -g nodemon

# Set environment variables
ENV PORT 8000

COPY ./dev/static.js /usr/app/server.js
COPY ./package.static.json /usr/app/package.json
WORKDIR /usr/app
RUN npm install

# Internal port
EXPOSE $PORT

# Run app using nodemon
ENTRYPOINT ["nodemon"]
CMD ["server.js"]


# docker run -d --net=web-network -p 8080:80 --name uploads -v /uploads:/usr/share/nginx/html:rw nginx
# docker run -d --net=web-network -p 8000:8000 --name graphics -v /uploads:/usr/app/uploads:rw shitulv/graphics


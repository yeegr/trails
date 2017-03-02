# Set nginx base image
FROM nginx:latest

# File author / maintainer
MAINTAINER Stone Chen (dev@shitulv.com)

# Copy custom configuration file from the current directory
COPY ./docker/config/gateway.conf /etc/nginx/nginx.conf

# docker run -d --net=web-network -p 80:80 --name uploads -v /uploads:/usr/share/nginx/html:rw nginx
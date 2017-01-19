# Set nginx base image
FROM nginx:latest

# File author / maintainer
MAINTAINER Stone Chen (dev@shitulv.com)

# Copy custom configuration file from the current directory
#COPY ./docker/config/web.conf /etc/nginx/nginx.conf
COPY ./dev/web /usr/share/nginx/html

# docker run -d --net=web-network -p 80:80 --name web1 
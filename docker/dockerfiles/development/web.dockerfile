# Set nginx base image
FROM nginx:latest

# File author / maintainer
MAINTAINER Stone Chen (dev@shitulv.com)

# Copy custom configuration file from the current directory
#COPY ./docker/config/development/web.conf /etc/nginx/nginx.conf
COPY ./dev/web /usr/share/nginx/html
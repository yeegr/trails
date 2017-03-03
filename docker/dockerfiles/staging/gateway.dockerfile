# Set nginx base image
FROM nginx:latest

# File author / maintainer
MAINTAINER Stone Chen (dev@shitulv.com)

# Copy custom configuration file from the current directory
COPY ./docker/config/staging/gateway.conf /etc/nginx/nginx.conf

# Set mongo base image
FROM mongo:latest

# File author / maintainer
MAINTAINER Stone Chen (dev@shitulv.com)

# Mount the MongoDB data directory
# RUN mkdir -p /data/db
VOLUME ["/data/db"]
WORKDIR /data/db

# Expose port #27017 from the container to the host
EXPOSE 27017

# Set /usr/bin/mongod as the dockerized entry-point application
ENTRYPOINT ["/usr/bin/mongod"]

#!/bin/bash

host='registry.cn-hangzhou.aliyuncs.com'
user='shitulv'
path=${host}/${user}

docker run -d --restart always --net=web-network --expose 80 --name uploads -v /uploads:/usr/share/nginx/html:rw nginx
docker run -d --restart always --net=web-network --expose 3000 --name static -v /uploads:/usr/app/uploads:rw ${path}/static
docker run -d --restart always --net=api-network --expose 27017 --name mongodb -v /data/db:/data/db ${path}/mongodb --smallfiles
docker run -d --restart always --net=api-network --expose 3000 --name api1 ${path}/api
docker run -d --restart always --net=api-network --expose 80 --name web1 ${path}/web
docker run -d --restart always --net=api-network -p 80:80 --name gateway ${path}/gateway

docker network connect web-network api1
docker network connect web-network web1
docker network connect web-network gateway

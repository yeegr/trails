#!/bin/bash

path="/devops/"

host='registry.cn-hangzhou.aliyuncs.com'
user='shitulv'
path=${host}/${user}

docker pull ${path}/web
docker rm -f web1
docker run -d --restart always --net=api-network --expose 80 --name web1 ${path}/web
docker network connect web-network web1
docker rmi $(docker images -q -f "dangling=true")

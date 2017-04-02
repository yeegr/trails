#!/bin/bash

path="/devops/"

host='registry.cn-hangzhou.aliyuncs.com'
user='shitulv'
path=${host}/${user}

docker pull ${path}/api
docker rm -f api1
docker run -d --restart always --net=api-network --expose 3000 --name api1 ${path}/api
docker network connect web-network api1
docker rmi $(docker images -q -f "dangling=true")

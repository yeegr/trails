#!/bin/bash

host='registry.cn-hangzhou.aliyuncs.com'
user='shitulv'
path=${host}/${user}

docker pull ${path}/mongodb
docker pull ${path}/static
docker pull ${path}/api
docker pull ${path}/web
docker pull ${path}/gateway

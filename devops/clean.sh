#!/bin/bash

host='registry.cn-hangzhou.aliyuncs.com'
user='shitulv'
path=${host}/${user}

docker rmi ${path}/mongodb ${path}/static ${path}/api ${path}/web ${path}/gateway

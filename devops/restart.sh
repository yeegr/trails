#!/bin/bash

path="/devops/"

bash /devops/pull.sh
bash /devops/remove.sh
bash /devops/start.sh

docker rmi $(docker images -q -f "dangling=true")

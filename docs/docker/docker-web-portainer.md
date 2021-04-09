---
title: Docker 可视化web管理界面 Portainer
date: '2019-10-2'
sidebar: 'auto'
categories:
- 运维
tags:
- docker
publish: true
---
# Run
```bask
docker run -ti -d --name some-portainer -p 9000:9000 --restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
portainer/portainer:latest
```

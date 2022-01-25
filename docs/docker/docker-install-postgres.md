---
title: Docker安装 postgresSql
date: '2021-4-28'
sidebar: 'auto'
categories:
- 运维
tags:
- docker
- postgres
publish: true
---

> Docker 安装 PostgresSql 仅用于测试使用.

### Run
```shell
docker run -d --restart always --privileged=true \
    --name postgres \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=Tan@1117 \
    -v $PWD/data:/var/lib/postgresql/data \
    postgres
```

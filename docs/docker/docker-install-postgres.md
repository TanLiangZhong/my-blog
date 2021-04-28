---
title: Docker安装 postgres
date: '2021-4-28'
sidebar: 'auto'
categories:
- 运维
tags:
- docker
- postgres
publish: true
---

> Docker 安装 postgres 仅用于测试使用.

### Run
```shell
docker run  -d --name some-postgres  -e POSTGRES_PASSWORD=123456 -p 5432:5432 postgres
```

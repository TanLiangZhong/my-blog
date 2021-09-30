---
title: docker compose 时区配置
date: '2020-11-9'
sidebar: 'auto'
categories:
- 运维
tags:
- docker
publish: true
---

### 详解
```yml
version: "3"  # docker-compose文本格式
services:

  some-mysql:
    image: "mysql:latest" # 镜像源
    restart: always # 是否随docker服务启动重启 
    container_name: some-mysql # 容器名称
    ports:
      - "3306:3306"  # 端口映射
    environment:
      - TZ=Asia/Shanghai # 时区配置亚洲上海，解决了容器的时区问题！！！
```
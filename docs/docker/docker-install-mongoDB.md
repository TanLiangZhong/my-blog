---
title: Docker安装MongoDB
date: '2020-11-6'
sidebar: 'auto'
categories:
- 运维
tags:
- docker
- mongodb
publish: true
---

### Run
```shell
docker run -itd --restart always --name some-mongo -p 27017:27017 mongo --auth
```
* -p 27017:27017 ：映射容器服务的 27017 端口到宿主机的 27017 端口。外部可以直接通过 宿主机 ip:27017 访问到 mongo 的服务。
* --auth：需要密码才能访问容器服务。
* --restart always: 总是启动容器

### 添加用户
```shell
# 进入容器
docker exec -it some-mongo mongo admin

# 创建一个名为 admin，密码为 123456 的用户。
>  db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});

# 尝试使用上面创建的用户信息进行连接。
> db.auth('admin', '123456')
```
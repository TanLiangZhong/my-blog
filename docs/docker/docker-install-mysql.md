---
title: Docker安装Mysql
date: '2020-7-6'
sidebar: 'auto'
categories:
- 运维
tags:
- docker
- mysql
publish: true
---

### 1. 创建配置文件`vi my.cnf`
```
[mysqld]
skip-host-cache
skip-name-resolve
lower_case_table_names = 1 # 大小写敏感，0：区分大小写，1：不区分大小写
log-bin=mysql-bin # 开启 binlog
binlog-format=ROW # 选择 ROW 模式
server_id=7777 # 配置 MySQL replaction 需要定义
```

### 2. 创建数据挂在目录`mkdir data`
```
tan@TandeMacBook-Pro mysql % ls
data my.cnf
```

### 3. 启动mysql
```bash
docker run -d -p 3306:3306 --restart always --privileged=true --name some-mysql \
-v $PWD/my.cnf:/etc/my.cnf \
-v $PWD/data:/var/lib/mysql \
-v /etc/localtime:/etc/localtime \
-e MYSQL_ROOT_PASSWORD=123456 \
-e MYSQL_ROOT_HOST=% \
mysql/mysql-server
```
* `-v $PWD/my.cnf:/etc/my.cnf` 挂载配置文件
* `-v $PWD/data:/var/lib/mysql` 挂载数据文件
* `-v /etc/localtime:/etc/localtime` 容器时间与宿主机同步
* `-e MYSQL_ROOT_PASSWORD=123456` root 账户密码
* `-e MYSQL_ROOT_HOST=% ` 允许连接的主机

### windows 命令
```bash
docker run -d -p 3306:3306 --restart always --privileged=true --name some-mysql `
-v $PWD/my.cnf:/etc/my.cnf `
-v $PWD/data:/var/lib/mysql `
-v /etc/localtime:/etc/localtime `
-e MYSQL_ROOT_PASSWORD=123456 `
-e MYSQL_ROOT_HOST=% `
mysql/mysql-server
```

### [官方文档](https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-more-topics.html#docker-persisting-data-configuration)

### [镜像地址](https://hub.docker.com/r/mysql/mysql-server)
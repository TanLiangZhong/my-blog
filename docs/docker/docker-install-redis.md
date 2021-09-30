---
title: Docker安装Redis
date: '2021-9-30'
sidebar: 'auto'
categories:
- 运维
tags:
- docker
- redis
publish: true
---

### 准备Redis配置文件
1. 下载 [Redis](https://redis.io/download) 使用里面的配置文件。
2. 解压 `redis-6.0.6.tar.gz`
3. 修改 `redis.conf` 配置文件
    * `bind 127.0.0.1`     #注释掉这部分，使redis可以外部访问   
    * `daemonize no`         #用守护线程的方式启动   
    * `requirepass password` #给redis设置密码   
    * `appendonly yes`       #redis持久化, 默认是no   
    * `tcp-keepalive 300`    #防止出现远程主机强迫关闭了一个现有的连接的错误 默认是300

### 创建Docker本地挂载目录
> 可自定义，我一般放在`/home`下，在`/home`创建`redis`目录。
```
mkdir /home/reids
```
复制刚修改的配置文件到 `/home/redis`

### Run
```shell
docker run -p 6379:6379 --name redis -v /home/redis/redis.conf:/etc/redis/redis.conf  -v /home/redis/data:/data -d redis redis-server /etc/redis/redis.conf --appendonly yes
```
 * `-p 6379:6379`: 把容器内的6379端口映射到宿主机6379端口
 * `-v /data/redis/redis.conf:/etc/redis/redis.conf`: 把宿主机配置好的redis.conf放到容器内的这个位置中
 * ` -v /data/redis/data:/data`: 把redis持久化的数据在宿主机内显示，做数据备份
 * `redis-server /etc/redis/redis.conf`: 这个是关键配置，让redis不是无配置启动，而是按照这个redis.conf的配置启动
 * `–appendonly yes`: redis启动后数据持久化

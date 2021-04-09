---
title: Linux Docker根目录迁移
date: '2020-11-20'
sidebar: 'auto'
categories:
- 运维
tags:
- docker
publish: true
---

> docker root dir 默认路径在: `/var/lib/docker`，占用较大的系统磁盘。可将其迁移至加载磁盘下

### 查看根目录
```bash
docker info | grep "Docker Root Dir"
```
### 迁移数据至挂载磁盘下
```bash

# 迁移根目录数据
cp -a /var/lib/docker /home/

# 备份原目录数据
mv -u /var/lib/docker /var/lib/docker.bak
```
### 修改daemon配置
```bash
vi /etc/docker/daemon.json
```
加入: 
```json
{
	"data-root": "/mnt/docker"
}
```
### 重启docker
`service docker restart`

## 附图
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd5216c8109b4f7ab381ab3482bdc087~tplv-k3u1fbpfcp-watermark.image)

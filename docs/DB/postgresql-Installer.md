---
title: Postgresql-13 installer
date: '2021-05-31'
sidebar: 'auto'
categories:
- 后端
tags:
- DB
publish: true
---


### 下载安装 Postgresql
> [官网下载地址](https://www.postgresql.org/download/), 阅读官网教程进行下载安装.

### 常用命令
```shell
# 启动
sudo systemctl start postgresql-13  
# postgresql服务状态
sudo systemctl status postgresql-13
# 关闭      
sudo systemctl stop postgresql-13
# 重启
sudo systemctl restart postgresql-13
```

### Postgresql 命令行
> 默认情况下 PostgreSQL 安装完成后，自带了一个命令行工具 SQL Shell(psql)。   
> Linux 系统可以直接切换到 postgres 用户来开启命令行工具：
```shell
# 切换 postgres 用户
sudo -i -u postgres
# 打开 SQL Shell(psql)
psql
```

### 修改配置远程连接
1. 修改`postgres`密码
    ```sql
    alter user postgres with password '123456'
    ```
2. 修改`/var/lib/pgsql/13/data/pg_hda.conf`, 新增配置
    ```
    host    all             all             0.0.0.0/0               trust       #允许任意ip访问
    ```
3. 修改`/var/lib/pgsql/13/data/postgresql.conf`
    ```
    listen_addresses = '*'        #监听全部
    ```
4. 关闭防火墙, 或者开放Postgresql端口
5. 重启Postgresql

### 相关文档
> https://www.postgresql.org/   
> http://www.postgres.cn/index.php/v2/home   
>https://www.runoob.com/postgresql/postgresql-tutorial.html

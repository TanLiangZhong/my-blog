---
title: Linux MongoDB 安装
date: '2020-03-22'
sidebar: 'auto'
categories:
- 运维
tags:
- linux
publish: true
---

### 下载 rpm 包
> 下载指定的rpm包 [下载地址](https://www.mongodb.com/try/download/community)
> 选择社区版, 下载 mongodb-server , mongodb-shell
> 复制到服务器新建的目录下

### 安装 mongodb-server
```shell
[root@localhost lz]# ls
mongodb-org-server-4.4.5-1.el8.x86_64.rpm
mongodb-org-shell-4.4.5-1.el8.x86_64.rpm
[root@localhost lz]# yum localinstall mongodb-org-server-4.4.5-1.el8.x86_64.rpm Fedora Modular 33 - x86_64 - Updates            3.7 kB/s | 4.2 kB     00:01    
Fedora Modular 33 - x86_64 - Updates             11 kB/s |  45 kB     00:03    
Fedora 33 - x86_64 - Updates                    5.3 kB/s | 4.2 kB     00:00    
Fedora 33 - x86_64 - Updates                     77 kB/s | 425 kB     00:05    
Last metadata expiration check: 0:00:02 ago on Thu 22 Apr 2021 11:17:30 AM CST.
Dependencies resolved.
================================================================================
 Package                 Arch        Version            Repository         Size
================================================================================
Installing:
 mongodb-org-server      x86_64      4.4.5-1.el8        @commandline       22 M

Transaction Summary
================================================================================
Install  1 Package

Total size: 22 M
Installed size: 79 M
Is this ok [y/N]: y
Downloading Packages:
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                        1/1 
  Running scriptlet: mongodb-org-server-4.4.5-1.el8.x86_64                  1/1 
  Installing       : mongodb-org-server-4.4.5-1.el8.x86_64                  1/1 
  Running scriptlet: mongodb-org-server-4.4.5-1.el8.x86_64                  1/1 
Created symlink /etc/systemd/system/multi-user.target.wants/mongod.service → /usr/lib/systemd/system/mongod.service.

  Verifying        : mongodb-org-server-4.4.5-1.el8.x86_64                  1/1 

Installed:
  mongodb-org-server-4.4.5-1.el8.x86_64                                         

Complete!
```

### 安装 mongodb-shell
```shell
[root@localhost lz]# yum localinstall mongodb-org-shell-4.4.5-1.el8.x86_64.rpm 
Last metadata expiration check: 0:03:28 ago on Thu 22 Apr 2021 11:17:30 AM CST.
Dependencies resolved.
================================================================================
 Package                 Arch        Version            Repository         Size
================================================================================
Installing:
 mongodb-org-shell      x86_64       4.4.5-1.el8        @commandline       14 M

Transaction Summary
================================================================================
Install  1 Package

Total size: 14 M
Installed size: 51 M
Is this ok [y/N]: y
Downloading Packages:
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                       1/1  
  Installing       : mongodb-org-shell-4.4.5-1.el8.x86_64                  1/1  
  Running scriptlet: mongodb-org-shell-4.4.5-1.el8.x86_64                  1/1  
  Verifying        : mongodb-org-shell-4.4.5-1.el8.x86_64                  1/1  

Installed:
  mongodb-org-shell-4.4.5-1.el8.x86_64                                                                                                                                                                                                                                   

Complete!
```

### 修改配置文件，[mongodb配置文档](https://docs.mongodb.com/manual/reference/configuration-options/#net-options)
> 配置绑定 任何ip都可连接mongodb，把 bindIp: 127.0.0.1 改为 0.0.0.0
```shell
[root@localhost lz]# cd /etc/
[root@localhost etc]# vi mongod.conf 

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.

```

### 启动mongoDB
1. 启动
    ```shell
    sudo systemctl start mongod
    ```

2. 验证MongoDB是否已成功启动
    ```
    sudo systemctl status mongod
    ```
    > 确保MongoDB将在系统重新启动后启动
    ```shell
    sudo systemctl enable mongod
    ```

3. 停止MongoDB
    ```shell
    sudo systemctl stop mongod
    ```

4. 停止MongoDB
    ```shell
    sudo systemctl restart mongod
    ```

5. 开始使用MongoDB
    ```shell
    mongo
    ```


### 使用 mongodb-shell 创建用户, [shell 文档](https://docs.mongodb.com/manual/reference/method/)
1. 连接mongo
    ```shell
    [root@localhost /]# mongo
    MongoDB shell version v4.4.5
    connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
    Implicit session: session { "id" : UUID("b85be611-cc9a-421e-b5a1-ba7fa307b5ec") }
    MongoDB server version: 4.4.5
    ---
    The server generated these startup warnings when booting: 
            2021-04-22T11:56:40.921+08:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
    ---
    ---
            Enable MongoDB's free cloud-based monitoring service, which will then receive and display
            metrics about your deployment (disk utilization, CPU, operation statistics, etc).

            The monitoring data will be available on a MongoDB website with a unique URL accessible to you
            and anyone you share the URL with. MongoDB may use this information to make product
            improvements and to suggest MongoDB products and deployment options to you.

            To enable free monitoring, run the following command: db.enableFreeMonitoring()
            To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
    ---
    > 
    ```

2. 创建超级管理员账号
    ```shell
    > use admin
    switched to db admin
    > db.createUser({user:'root',pwd:'123456', roles:[{role:'root', db:'admin'}]})
    Successfully added user: {
            "user" : "root",
            "roles" : [
                    {
                            "role" : "root",
                            "db" : "admin"
                    }
            ]
    }
    > 
    ```

    命令详解
    ```json
    {
        user: 'root', // 用户名
        pwd: '123456', // 密码
        roles: [        // 角色配置
            {
                role: 'root', // root 超级管理员, mongodb 内置角色
                db: 'admin'     // 数据库
            }
        ]
    }
    ```

3. 使用用户管理账户登录认证
    ```shell
    > db.auth('root','123456')
    1
    > 
    ```
































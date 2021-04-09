---
title: Centos7 Ip配置
date: '2020-11-27'
sidebar: 'auto'
categories:
- 运维
tags:
- linux
publish: true
---
 
> ip地址配置方式主要有两种
> * 动态获取Ip
> * 设置静态Ip

### 动态获取Ip
```bash
vi /etc/sysconfig/network-scripts/ifcfg-ens160
```
修改:
```
onboot=yes #开机启动
bootproto=dhcp #自动获取Ip
```
### 设置静态Ip
修改:
```
onboot=yes #开机启动
bootproto=static #使用静态Ip
IPADDR=192.168.1.17 #ip地址
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS=8.8.8.8
```

---
title: npm install 详解
date: '2021-03-09'
sidebar: 'auto'
categories:
- 前端
tags:
- node
publish: true
---

> `npm install moduleName` // 安装模块到项目目录下

> `npm install -g moduleName` // -g 的意思是将模块安装到全局，具体安装到磁盘哪个位置，要看 npm config prefix 的位置。

> `npm install -save moduleName` // -save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。

> `npm install -save-dev moduleName` // -save-dev 的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。


### 配置淘宝镜像加速
```
npm config set registry=https://registry.npm.taobao.org

// 查看
npm config get registry
```


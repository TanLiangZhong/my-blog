---
title: yarn安装
date: '2021-03-09'
sidebar: 'auto'
categories:
- 前端
tags:
- node
publish: true
---

### 1. 安装
```
$ npm install -g yarn

> yarn@1.22.10 preinstall /opt/nodejs/node-v14.16.0-linux-x64/lib/node_modules/yarn
> :; (node ./preinstall.js > /dev/null 2>&1 || true)

/opt/nodejs/node-v14.16.0-linux-x64/bin/yarn -> /opt/nodejs/node-v14.16.0-linux-x64/lib/node_modules/yarn/bin/yarn.js
/opt/nodejs/node-v14.16.0-linux-x64/bin/yarnpkg -> /opt/nodejs/node-v14.16.0-linux-x64/lib/node_modules/yarn/bin/yarn.js
+ yarn@1.22.10
added 1 package in 0.891s
root@DESKTOP-DRFDMGS:/workspace/dapp/learn-hardhat# yarn -v
1.22.10
```

### 2. 配置淘宝镜像加速
* 1. 查看 `registry`
```
$ yarn config get registry
https://registry.yarnpkg.com
```
* 2. 修改`registry`
```
$ yarn config set registry https://registry.npm.taobao.org
yarn config v1.22.10
success Set "registry" to "https://registry.npm.taobao.org".
Done in 0.03s.
```

### 3. 常用命令与 `npm` 对比
| npm | yarn |
|:----------:|:----------:|
| npm install | yarn |
| npm install react --save | yarn add react |
| npm uninstall react --save | yarn remove react |
| npm install react --save-dev	 | yarn add  --dev react |
| npm update --save	 | yarn upgrade |


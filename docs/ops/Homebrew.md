---
title: Mac OS 安装 Homebrew
date: '2022-1-5'
sidebar: 'auto'
categories:
- 运维
tags:
- mac os
publish: true
---

### [官网安装](https://brew.sh/)
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### [国内镜像安装](https://gitee.com/cunkai/HomebrewCN)
```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

### 常用命令
* `brew help` 查看帮助
* `brew list` 列出已安装的软件包
* `brew install <package name>` 安装软件包
* `brew uninstall <package name>` 卸载软件包
* `brew search <package name>` 查找软件包
* `brew info <package name>` 查看软件包信息
* `brew -v` 查看brew版本
* `brew update` 更新brew
* `brew outdated` 列出需要更新的软件包
* `brew upgrade [<package name>]` 可选指定更新某个软件包，默认更新所有软件包

### 卸载
```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```
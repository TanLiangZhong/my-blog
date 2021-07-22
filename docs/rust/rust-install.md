---
title: Rust 安装
date: '2021-07-22'
sidebar: 'auto'
categories:
- Rust
tags:
- Rust
publish: true
---


### Ubuntu 安装 Rust
> 参照官方文档, [安装文档](https://www.rust-lang.org/zh-CN/learn/get-started)

### 相关问题

#### 1. 在Windows wsl 里 `run` error: linker `cc` not found
```shell
   Compiling hello-rust v0.1.0 (/home/rust/hello-rust)
error: linker `cc` not found
  |
  = note: No such file or directory (os error 2)

error: aborting due to previous error

error: could not compile `hello-rust`

To learn more, run the command again with --verbose.
```
> 原因缺少 gcc
> 解决方案
```shell
sudo apt-get update
sudo apt install build-essential
```
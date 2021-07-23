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


### Windows 子系统 wsl, Ubuntu 安装 Rust
> 参照官方文档, [安装文档](https://www.rust-lang.org/zh-CN/learn/get-started)

### Cargo: Rust 的构建工具和包管理器
* `cargo build` 可以构建项目
* `cargo run` 可以运行项目
* `cargo test` 可以测试项目
* `cargo doc` 可以为项目构建文档
* `cargo publish` 可以将库发布到 [crates.io](https://crates.io/)。

### Cargo 更换国内源
* 中科大源
  * linux
  ```shell
  tee $HOME/.cargo/config <<-'EOF'
  [source.crates-io]
  registry = "https://github.com/rust-lang/crates.io-index"
  replace-with = 'ustc'
  [source.ustc]
  registry = "git://mirrors.ustc.edu.cn/crates.io-index"
  EOF
  ```
  * Windows
  > 在 `C:\Users\user\.cargo` 下新增 `config` 文件加入配置
  ```
  [source.crates-io]
  registry = "https://github.com/rust-lang/crates.io-index"
  replace-with = 'ustc'
  [source.ustc]
  registry = "git://mirrors.ustc.edu.cn/crates.io-index"
  EOF
  ```

### 卸载Rust
> `rustup self uninstall`

### 相关问题
#### 1. 在Windows wsl 里 `run` error: linker `cc` not found
[参考链接](https://stackoverflow.com/questions/52445961/how-do-i-fix-the-rust-error-linker-cc-not-found-for-debian-on-windows-10)
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

### 相关链接
* [Rust中文网](https://rustwiki.org/)
* [Rust官网](https://www.rust-lang.org/)


### Rust 2021
1. 安装最近的nightly：`rustup update nightl`y.
2. 运行 `cargo +nightly fix --edition`。
3. 编辑Cargo.toml并放置cargo-features = ["edition2021"]在顶部（上方[package]），并将编辑字段更改为edition = "2021"。
4. 运行`cargo +nightly check`以验证它现在可以在新版本中使用。
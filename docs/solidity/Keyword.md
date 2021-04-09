---
title: Solidity keyword 详解
date: '2021-2-3'
sidebar: 'auto'
categories:
- 区块链
tags:
- solidity
publish: true
---


* `private` 私有的。只能在当前合约使用，不能在外部被调用，不能被继承
* `public` 公众的。如何地方都调用，可以被继承
* `internal` 可以在内部被调用，不可在外部调用，不能继承
* `external` 不能在内部调用，只能在外部调用
* `pure` 纯函数。不会读取和修改全局变量
* `constant` 常量。
* `view` 视图函数。会读取全局变量，但不能修改
* `payable` 交易时必须加上的关键字
* `is` 继承
* `require` 








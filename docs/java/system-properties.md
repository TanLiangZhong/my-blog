---
title: java系统属性(Java System Properties)
date: '2021-06-07'
sidebar: 'auto'
categories:
- 后端
tags:
- java
publish: true
---

> 当前系统属性。 首先，如果有一个安全管理器，它的checkPropertiesAccess方法被无参数调用。 这可能会导致安全异常。   
> Java安全管理器和策略文件可以限制对系统属性的访问。默认情况下，Java程序可以无限制地访问所有系统属性。

### java 系统属性

|  Key   | 描述  |
|  ----  | ----  |
|  java.version  |  Java Runtime Environment 版本，可以解释为Runtime.Version  |
|  java.version.date  |  Java 运行时环境版本日期，采用 ISO-8601 YYYY-MM-DD 格式，可以解释为java.time.LocalDate  |
|  java.vendor  |  Java 运行时环境供应商  |
|  java.vendor.url  |  Java 供应商 URL  |
|  java.vendor.version  |  Java 供应商版本  |
|  java.home  |  Java安装目录  |
|  java.vm.specification.version  |  Java 虚拟机规范版本，其值为运行时版本的特征元素  |
|  java.vm.specification.vendor  |  Java 虚拟机规范供应商  |
|  java.vm.specification.name  |  Java 虚拟机规范名称  |
|  java.vm.version  |  可以解释为Runtime.Version Java 虚拟机实现版本  |
|  java.vm.vendor  |  Java 虚拟机实现供应商  |
|  java.vm.name  |  Java 虚拟机实现名称  |
|  java.specification.version  |  Java Runtime Environment 规范版本，其值为运行时版本的特征元素  |
|  java.specification.vendor  |  Java 运行时环境规范供应商  |
|  java.specification.name  |  Java 运行时环境规范名称  |
|  java.class.version  |  Java 类格式版本号  |
|  java.class.path  |  Java 类路径（详见ClassLoader.getSystemClassLoader() ）  |
|  java.library.path  |  加载库时要搜索的路径列表  |
|  java.io.tmpdir  |  默认临时文件路径  |
|  java.compiler  |  要使用的 JIT 编译器的名称  |
|  os.name  |  操作系统名称  |
|  os.arch  |  操作系统架构  |
|  os.version  |  操作系统版本  |
|  file.separator  |  文件分隔符（UNIX 上的“/”）  |
|  path.separator  |  路径分隔符（UNIX 上的“:”）  |
|  line.separator  |  行分隔符（UNIX 上的“\n”）  |
|  user.name  |  用户的帐户名  |
|  user.home  |  用户的主目录  |
|  user.dir  |  用户当前工作目录  |
|  jdk.module.path  |  应用模块路径  |
|  jdk.module.upgrade.path  |  升级模块路径  |
|  jdk.module.main  |  初始/主模块的模块名称  |
|  jdk.module.main.class  |  初始模块的主类名  |

### 获取系统属性
```java
    public static void main(String[] args) {
        // 获取所有系统属性
        Properties properties = System.getProperties();
        properties.forEach((k, v) -> System.out.println("k: " + k + "v: " + v.toString()));

        // 获取单个系统数据
        System.out.println(System.getProperty("user.name"));
        System.out.println(System.getProperty("os.name"));
        System.out.println(System.getProperty("os.arch"));
        System.out.println(System.getProperty("os.version"));
    }
```

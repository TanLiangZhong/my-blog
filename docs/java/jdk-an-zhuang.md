---
title: JDK安装
date: '2018-06-13'
sidebar: 'auto'
categories:
- 后端
tags:
- java
publish: true
---

### Win 10安装.

1. [下载地址](https://www.oracle.com/technetwork/cn/java/javase/downloads/index.html)
2. 双击.exe安装,无脑下一步.
3. 配置环境变量.

### Linux 安装

1. 在 opt 目录下新建文件夹：

   ```text
   sudo mkdir java
   ```

2. 将下载的jdk 解压至刚创建的目录下： 

   ```text
   tar -zxvf jdk-10.0.1_linux-x64_bin.tar.gz -C /opt/java
   ```

   \`\`\`

3. 配置环境

   ```text
   sudo vi ~/.bashrc 
   //在文件末尾添加
   export JAVA_HOME=/opt/work/ide/jdk-10.0.1   
   export JRE_HOME=$JAVA_HOME/jre
   export CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH
   export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
   ```

4. 输入 source ~/.bashrc 使配置生效
5. 输入 java -version 


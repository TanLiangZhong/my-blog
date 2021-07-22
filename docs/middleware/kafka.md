---
title: kafka 安装
date: '2021-07-22'
sidebar: 'auto'
categories:
- 中间件
tags:
- MQ
publish: true
---

###
```shell

# 安装 zookeeper
# https://hub.docker.com/_/zookeeper
docker run -d -p 2181:2181 --name some-zookeeper zookeeper

# 安装 kafka
# https://kafka.apache.org/quickstart


# 启动kafka
.\bin\windows\kafka-server-start.bat config/server.properties

# 创建 topic
.\kafka-topics.bat --create --topic quickstart-events --bootstrap-server localhost:9092

# 查看 topic
.\kafka-topics.bat --describe --topic quickstart-events --bootstrap-server localhost:9092

# 将事件写入 topic
.\kafka-console-producer.bat --topic quickstart-events --bootstrap-server localhost:9092

This is my first event
This is my second event
Hello World!

# 阅读 topic
.\kafka-console-consumer.bat --topic quickstart-events --from-beginning --bootstrap-server localhost:9092

# 安装 kafka-manager
# https://hub.docker.com/r/kafkamanager/kafka-manager
# https://github.com/yahoo/CMAK

docker run -d -p 9000:9000 --name some-kafka-manager -e ZK_HOSTS=192.168.31.179 kafkamanager/kafka-manager


```
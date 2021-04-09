---
title: Docker安装Nacos
date: '2020-5-8'
sidebar: 'auto'
categories:
- 运维
tags:
- docker
- spring-cloud
publish: true
---


### 创建挂载文件
```bash
mkdir logs
vim init.d/custom.properties
```

### custom.properties 内容
```properties
#spring.security.enabled=false
#management.security=false
#security.basic.enabled=false
#nacos.security.ignore.urls=/**
#management.metrics.export.elastic.host=http://localhost:9200
# metrics for prometheus
management.endpoints.web.exposure.include=*

# metrics for elastic search
#management.metrics.export.elastic.enabled=false
#management.metrics.export.elastic.host=http://localhost:9200

# metrics for influx
#management.metrics.export.influx.enabled=false
#management.metrics.export.influx.db=springboot
#management.metrics.export.influx.uri=http://localhost:8086
#management.metrics.export.influx.auto-create-db=true
#management.metrics.export.influx.consistency=one
#management.metrics.export.influx.compressed=true
```


### Run
```bash
docker run -d -p 8848:8848 --restart always --privileged=true --name some-nacos \
-v $PWD/logs/:/home/nacos/logs \
-v $PWD/init.d/custom.properties:/home/nacos/init.d/custom.properties \
-v /etc/localtime:/etc/localtime \
-e PREFER_HOST_MODE=hostname \
-e MODE=standalone \
-e SPRING_DATASOURCE_PLATFORM=mysql \
-e MYSQL_SERVICE_HOST=localhost \
-e MYSQL_SERVICE_DB_NAME=nacos_devtest \
-e MYSQL_SERVICE_PORT=3306 \
-e MYSQL_SERVICE_USER=mysql \
-e MYSQL_SERVICE_PASSWORD=P@ssw0rd2020 \
nacos/nacos-server:latest
```

## 相关文档
官方文档: https://nacos.io/zh-cn/docs/quick-start-docker.html

---
title: SpringCloudGateway处理跨域
date: 2021-1-21
sidebar: 'auto' 
categories:
- 后端
tags:
- spring-cloud
- cors
publish: true
---
### 通过bootstrap.yml配置
```yml
spring:
    gateway:
      globalcors:
        cors-configurations:
          '[/**]':
            allowedOrigins: "*"
            allowedMethods: "*"
            exposedHeaders: "*"
            allowCredentials: true
```

### 相关文档
* [跨源资源共享（CORS）介绍](https://juejin.cn/post/6920075740700639245)
* [官方文档](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#cors-configuration)
---
title: Spring Boot 使用 Cacheable
date: '2019-06-07'
sidebar: 'auto'
categories:
- 后端
tags:
- spring-boot
publish: true
---

### 相关文档：

{% embed url="https://docs.spring.io/spring/docs/5.0.4.BUILD-SNAPSHOT/javadoc-api/org/springframework/cache/annotation/CacheConfig.html" %}

{% embed url="https://www.ibm.com/developerworks/cn/opensource/os-cn-spring-cache/" %}

{% embed url="https://www.cnblogs.com/yueshutong/p/9381540.html" %}

### 示例:

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching // 开启缓存
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@CacheConfig(cacheNames = "Demo")
public class DemoService {
    // 缓存
    @Cacheable(key = "'DEMO'")
    public String demoCacheable(String name) {
        log.info("demoCacheable: {}", name);
        return "Hello " + name;
    }
    // 更新
    @CachePut(key = "'DEMO'")
    public String demoCachePut(String name) {
        log.info("demoCachePut: {}", name);
        return "Hello " + name;
    }
    // 清除
    @CacheEvict(key = "'DEMO'")
    public String demoCacheEvict(String name) {
        log.info("demoCacheEvict: {}", name);
        return "Hello " + name;
    }
}
```

### 注意: 内部调用时 @Cacheable、@CachePut、 @CacheEvict 均会失效


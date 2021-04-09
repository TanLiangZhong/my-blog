---
title: SpringData Redis Messaging (Pub/Sub)
date: '2021-1-26'
sidebar: 'auto'
categories:
- 后端
tags:
- spring-boot
publish: true
---
### 订阅 (Receiving Messages)
```
@Configuration
public class RedisConfig {

    @Resource
    private RedisConnectionFactory redisConnectionFactory;

    // 序列化配置
    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new GenericFastJsonRedisSerializer());

        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(new GenericFastJsonRedisSerializer());
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        return redisTemplate;
    }

    // 订阅
    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer() {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(redisConnectionFactory);
        container.addMessageListener((message, pattern) -> {
            System.out.println(" listenerContainer Body: " + new String(message.getBody(), StandardCharsets.UTF_8));
            System.out.println(" listenerContainer Channel: " + new String(message.getChannel(), StandardCharsets.UTF_8));
        }, ChannelTopic.of("DEFAULT_CHANNEL"));
        return container;
    }
}
```

### 发布 (Sending Messages)
```
RedisTemplate redisTemplate = ...
redisTemplate.convertAndSend("DEFAULT_CHANNEL", "Hello Redis");
```

### 相关文档
[官方文档](https://docs.spring.io/spring-data/redis/docs/2.4.3/reference/html/#pubsub)
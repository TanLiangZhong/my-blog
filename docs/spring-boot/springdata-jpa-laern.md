---
title: Spring Data Jpa
date: '2019-07-19'
sidebar: 'auto'
categories:
- 后端
tags:
- spring-boot
publish: true
---

### 相关文档:

{% embed url="https://spring.io/projects/spring-data-jpa\#learn" %}

### 1. add Depending

```markup
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

### 2. add Entity

```java
@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@Entity // 用于注明该类是一个实体类
@Table(name = "anime") //表明该实体类映射到数据库的 t_customer 表
public class Anime extends BaseEntity {

    /**
     * UUID 主键 ID
     * @GeneratedValue(generator = "system-uuid")
     * @GenericGenerator(name = "system-uuid", strategy = "uuid")
     * <p>
     * 有数据库的自增列提供主键  ,  IDENTITY 与 AUTO 策略相同
     * @GeneratedValue(strategy = GenerationType.IDENTITY)
     * <p>
     */
    @TableGenerator(
            name = "ID_GENERATOR",
            table = "sys_sequence",   // 主键表 表名
            pkColumnName = "seq_name", // 过滤条件列名
            pkColumnValue = "seq_anime",  //  过滤条件值. 通过 pkColumnName pkColumnValue 确定具体的行
            valueColumnName = "current_value", // 属性指定了seed_id的列名 ,  规定了这一列必须是数值型（int,long等）
            allocationSize = 17,  // 属性需要赋一个整数值。表示了bucket的容量。其默认值为50
            initialValue = 1       //初始值
    )
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "ID_GENERATOR")
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", length = -1)
    private String description;

}
```

> JPA主键生策略 `AUTO` `IDENTITY` `SEQUENCE` `TABLE`， 推荐使用 `TABLE` 主键生成策略。它是在不影响性能情况下，通用性最强的JPA主键生策略

### 3. add Repostiory

```java
@Repository
public interface AnimeRepository extends JpaRepository<Anime, Long> {

}
```

### 4. add Config

```yaml
spring:
  # 指定数据源
  datasource:
    url: jdbc:mysql://123.206.125.80:3306/kirito?autoReconnect=true&useUnicode=true&amp&characterEncoding=UTF-8
    username: root
    password: MyNewPass4!
    driver-class-name: com.mysql.cj.jdbc.Driver


  #jap 配置
  jpa:
    # 数据库
    database: mysql
    database-platform: org.hibernate.dialect.MySQL5Dialect
    # 是否控制台打印 sql
    show-sql: true
    hibernate:
      #      validate              加载hibernate时，验证创建数据库表结构
      #      create                每次加载hibernate，重新创建数据库表结构，这就是导致数据库表数据丢失的原因。
      #      create-drop        加载hibernate时创建，退出是删除表结构
      #      update               加载hibernate自动更新数据库结构
      ddl-auto: validate
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
      use-new-id-generator-mappings: true

  # 当遇到同样名称时, 是否允许覆盖注册
  main:
    allow-bean-definition-overriding: true
```

### 4. docker-install-Mysql

```text
1. docker run -p 3306:3306 --name ml-mysql -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```


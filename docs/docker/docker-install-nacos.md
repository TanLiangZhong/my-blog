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

### 创建数据库`nacos_devtest`, 执行语句初始化表
```sql
create table config_info
(
    id           bigint auto_increment comment 'id'
        primary key,
    data_id      varchar(255)                           not null comment 'data_id',
    group_id     varchar(255)                           null,
    content      longtext                               not null comment 'content',
    md5          varchar(32)                            null comment 'md5',
    gmt_create   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    gmt_modified datetime     default CURRENT_TIMESTAMP not null comment '修改时间',
    src_user     text                                   null comment 'source user',
    src_ip       varchar(20)                            null comment 'source ip',
    app_name     varchar(128)                           null,
    tenant_id    varchar(128) default ''                null comment '租户字段',
    c_desc       varchar(256)                           null,
    c_use        varchar(64)                            null,
    effect       varchar(64)                            null,
    type         varchar(64)                            null,
    c_schema     text                                   null,
    constraint uk_configinfo_datagrouptenant
        unique (data_id, group_id, tenant_id)
)
    comment 'config_info' collate = utf8_bin;

create table config_info_aggr
(
    id           bigint auto_increment comment 'id'
        primary key,
    data_id      varchar(255)            not null comment 'data_id',
    group_id     varchar(255)            not null comment 'group_id',
    datum_id     varchar(255)            not null comment 'datum_id',
    content      longtext                not null comment '内容',
    gmt_modified datetime                not null comment '修改时间',
    app_name     varchar(128)            null,
    tenant_id    varchar(128) default '' null comment '租户字段',
    constraint uk_configinfoaggr_datagrouptenantdatum
        unique (data_id, group_id, tenant_id, datum_id)
)
    comment '增加租户字段' collate = utf8_bin;

create table config_info_beta
(
    id           bigint auto_increment comment 'id'
        primary key,
    data_id      varchar(255)                           not null comment 'data_id',
    group_id     varchar(128)                           not null comment 'group_id',
    app_name     varchar(128)                           null comment 'app_name',
    content      longtext                               not null comment 'content',
    beta_ips     varchar(1024)                          null comment 'betaIps',
    md5          varchar(32)                            null comment 'md5',
    gmt_create   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    gmt_modified datetime     default CURRENT_TIMESTAMP not null comment '修改时间',
    src_user     text                                   null comment 'source user',
    src_ip       varchar(20)                            null comment 'source ip',
    tenant_id    varchar(128) default ''                null comment '租户字段',
    constraint uk_configinfobeta_datagrouptenant
        unique (data_id, group_id, tenant_id)
)
    comment 'config_info_beta' collate = utf8_bin;

create table config_info_tag
(
    id           bigint auto_increment comment 'id'
        primary key,
    data_id      varchar(255)                           not null comment 'data_id',
    group_id     varchar(128)                           not null comment 'group_id',
    tenant_id    varchar(128) default ''                null comment 'tenant_id',
    tag_id       varchar(128)                           not null comment 'tag_id',
    app_name     varchar(128)                           null comment 'app_name',
    content      longtext                               not null comment 'content',
    md5          varchar(32)                            null comment 'md5',
    gmt_create   datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    gmt_modified datetime     default CURRENT_TIMESTAMP not null comment '修改时间',
    src_user     text                                   null comment 'source user',
    src_ip       varchar(20)                            null comment 'source ip',
    constraint uk_configinfotag_datagrouptenanttag
        unique (data_id, group_id, tenant_id, tag_id)
)
    comment 'config_info_tag' collate = utf8_bin;

create table config_tags_relation
(
    id        bigint                  not null comment 'id',
    tag_name  varchar(128)            not null comment 'tag_name',
    tag_type  varchar(64)             null comment 'tag_type',
    data_id   varchar(255)            not null comment 'data_id',
    group_id  varchar(128)            not null comment 'group_id',
    tenant_id varchar(128) default '' null comment 'tenant_id',
    nid       bigint auto_increment
        primary key,
    constraint uk_configtagrelation_configidtag
        unique (id, tag_name, tag_type)
)
    comment 'config_tag_relation' collate = utf8_bin;

create index idx_tenant_id
    on config_tags_relation (tenant_id);

create table group_capacity
(
    id                bigint unsigned auto_increment comment '主键ID'
        primary key,
    group_id          varchar(128) default ''                not null comment 'Group ID，空字符表示整个集群',
    quota             int unsigned default '0'               not null comment '配额，0表示使用默认值',
    `usage`           int unsigned default '0'               not null comment '使用量',
    max_size          int unsigned default '0'               not null comment '单个配置大小上限，单位为字节，0表示使用默认值',
    max_aggr_count    int unsigned default '0'               not null comment '聚合子配置最大个数，，0表示使用默认值',
    max_aggr_size     int unsigned default '0'               not null comment '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
    max_history_count int unsigned default '0'               not null comment '最大变更历史数量',
    gmt_create        datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    gmt_modified      datetime     default CURRENT_TIMESTAMP not null comment '修改时间',
    constraint uk_group_id
        unique (group_id)
)
    comment '集群、各Group容量信息表' collate = utf8_bin;

create table his_config_info
(
    id           bigint unsigned                        not null,
    nid          bigint unsigned auto_increment
        primary key,
    data_id      varchar(255)                           not null,
    group_id     varchar(128)                           not null,
    app_name     varchar(128)                           null comment 'app_name',
    content      longtext                               not null,
    md5          varchar(32)                            null,
    gmt_create   datetime     default CURRENT_TIMESTAMP not null,
    gmt_modified datetime     default CURRENT_TIMESTAMP not null,
    src_user     text                                   null,
    src_ip       varchar(20)                            null,
    op_type      char(10)                               null,
    tenant_id    varchar(128) default ''                null comment '租户字段'
)
    comment '多租户改造' collate = utf8_bin;

create index idx_did
    on his_config_info (data_id);

create index idx_gmt_create
    on his_config_info (gmt_create);

create index idx_gmt_modified
    on his_config_info (gmt_modified);

create table permissions
(
    role     varchar(50)  not null,
    resource varchar(512) not null,
    action   varchar(8)   not null,
    constraint uk_role_permission
        unique (role, resource, action)
)
    collate = utf8_unicode_ci;

create table roles
(
    username varchar(50) not null,
    role     varchar(50) not null,
    constraint idx_user_role
        unique (username, role)
)
    collate = utf8_unicode_ci;

create table tenant_capacity
(
    id                bigint unsigned auto_increment comment '主键ID'
        primary key,
    tenant_id         varchar(128) default ''                not null comment 'Tenant ID',
    quota             int unsigned default '0'               not null comment '配额，0表示使用默认值',
    `usage`           int unsigned default '0'               not null comment '使用量',
    max_size          int unsigned default '0'               not null comment '单个配置大小上限，单位为字节，0表示使用默认值',
    max_aggr_count    int unsigned default '0'               not null comment '聚合子配置最大个数',
    max_aggr_size     int unsigned default '0'               not null comment '单个聚合数据的子配置大小上限，单位为字节，0表示使用默认值',
    max_history_count int unsigned default '0'               not null comment '最大变更历史数量',
    gmt_create        datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    gmt_modified      datetime     default CURRENT_TIMESTAMP not null comment '修改时间',
    constraint uk_tenant_id
        unique (tenant_id)
)
    comment '租户容量信息表' collate = utf8_bin;

create table tenant_info
(
    id            bigint auto_increment comment 'id'
        primary key,
    kp            varchar(128)            not null comment 'kp',
    tenant_id     varchar(128) default '' null comment 'tenant_id',
    tenant_name   varchar(128) default '' null comment 'tenant_name',
    tenant_desc   varchar(256)            null comment 'tenant_desc',
    create_source varchar(32)             null comment 'create_source',
    gmt_create    bigint                  not null comment '创建时间',
    gmt_modified  bigint                  not null comment '修改时间',
    constraint uk_tenant_info_kptenantid
        unique (kp, tenant_id)
)
    comment 'tenant_info' collate = utf8_bin;

create index idx_tenant_id
    on tenant_info (tenant_id);

create table users
(
    username varchar(50)  not null
        primary key,
    password varchar(500) not null,
    enabled  tinyint(1)   not null
)
    collate = utf8_unicode_ci;


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

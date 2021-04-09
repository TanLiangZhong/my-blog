---
title: Jenkins + docker + docker-compose DevOps
date: '2019-8-11'
sidebar: 'auto'
categories:
- 运维
tags:
- docker
- jenkins
publish: true
---

### 1. 安装docker-compose
```shell
curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### 2. 安装Jenkins
```shell
docker run -u root -d --name jenkins -p 49000:8080 -p 50000:50000 -v /etc/localtime:/etc/localtime:ro -v /app/data/jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose jenkinsci/blueocean
```

`-v /etc/localtime:/etc/localtime:ro` 配置容器时间  
`-v /app/data/jenkins-data:/var/jenkins_home` 挂载容器地址  
`-v /var/run/docker.sock:/var/run/docker.sock` 宿主机docker挂载,用于在容器内可以使用docker命令   
`-v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose`  挂载docker-compose, 用于在容器内可以使用docker-compose命令

### 3. Jenkinsfile
```yml
pipeline {
  agent any
  environment {
    profiles = 'test'
    tag = '1.0'
  }
  stages {
    stage('build') {
      steps {
        sh "mvn -P ${profiles} clean package"
      }
    }

    stage('down') {
      steps {
        sh 'docker-compose down'
        sh "docker rmi -f jt-gateway:${tag}"
        sh "docker rmi -f jt-system:${tag}"
        sh "docker rmi -f jt-task-center:${tag}"
      }
    }

    stage('build images') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('run') {
      steps {
        sh 'docker-compose up -d'
      }
    }

  }
  tools {
    maven 'maven3'
  }
}
```

### 4. Dockerfile
```docker
FROM openjdk:8-jre-alpine
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
COPY --from=hengyunabc/arthas:latest /opt/arthas /opt/arthas
MAINTAINER LiangZhong.Tan<liangzhong.tan@outlook.com>
VOLUME /tmp
ADD ./target/jt-task-center-1.0.jar app.jar
ENV JAVA_OPTS="-Xms128m -Xmx374m"
ENTRYPOINT ["sh", "-c", "java -server $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar"]
```

### 5. docker-compose.yml
```yml
version: "3"
services:

  jt-gateway:
    build:
      context: ./jt-gateway
      dockerfile: Dockerfile
    image: "jt-gateway:1.0"
    restart: always
    container_name: jt-gateway
    ports:
      - "8081:8081"
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - /usr/share/zoneinfo/Asia/Shanghai:/etc/localtime

  jt-system:
    build:
      context: ./jt-system
      dockerfile: Dockerfile
    image: "jt-system:1.0"
    restart: always
    container_name: jt-system
    ports:
      - "8082:8082"
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - /usr/share/zoneinfo/Asia/Shanghai:/etc/localtime

  jt-task-center:
    build:
      context: ./jt-task-center
      dockerfile: Dockerfile
    image: "jt-task-center:1.0"
    restart: always
    container_name: jt-task-center
    ports:
      - "8083:8083"
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - /usr/share/zoneinfo/Asia/Shanghai:/etc/localtime
```
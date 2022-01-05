
```shell
docker run -d --name elasticsearch \
-p 9200:9200 -p 9300:9300 \
-e "discovery.type=single-node" \
-e "cluster.name=elasticsearch" \
-v $PWD/plugins:/usr/share/elasticsearch/plugins \
-v $PWD/data:/usr/share/elasticsearch/data \
elasticsearch:7.16.1


docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.16.1
```
### http://39.99.249.107:9200/


### logstash
```shell
docker run -d --name logstash -p 9005:9005 \
--link elasticsearch:es \
-v $PWD/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
logstash:7.16.1
```

```json
docker pull logstash:7.6.2
2.添加Logstash配置文件logstash.conf
input {
  tcp {
    mode => "server"
    host => "0.0.0.0"
    port => 9005
    codec => json_lines
    type => "record"
  }
}
filter {
  if [type] == "record" {
    mutate {
      remove_field => "port"
      remove_field => "host"
      remove_field => "@version"
    }
    json {
      source => "message"
      remove_field => ["message"]
    }
  }
}
output {
  elasticsearch {
    hosts => "es:9200"
  }
}
```


### kibana
```shell
docker run --name kibana -p 9004:5601 \
--link elasticsearch:es \
-e "elasticsearch.hosts=http://es:9200" \
-d kibana:7.6.2
```
```shell
docker exec -it kibana bash
cd config
vi kibana.yml
```


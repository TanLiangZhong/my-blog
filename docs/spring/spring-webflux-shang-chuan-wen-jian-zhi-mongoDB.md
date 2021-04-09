---
title: Spring webflux上传文件至MongoDB
date: '2020-12-6'
sidebar: 'auto'
categories:
- 后端
tags:
- spring
- mongodb
publish: true
---
```java
public class FileController {

    private final GridFSBucket gridFSBucket;
    private final ReactiveGridFsOperations operations;

    @ApiOperation("文件上传")
    @PostMapping(value = "upload")
    public Mono<String> upload(@RequestPart("file") FilePart filePart) {
        return operations.store(filePart.content(), filePart.filename()).map(ObjectId::toHexString);
    }

    @ApiOperation("文件预览")
    @GetMapping("preview/{id}.*")
    public Mono<Void> preview(@PathVariable String id, ServerHttpResponse response) {
        return operations.findOne(Query.query(Criteria.where("_id").is(id))).map(gridFsFile -> {
            GridFSDownloadPublisher publisher = gridFSBucket.downloadToPublisher(gridFsFile.getObjectId());
            DataBufferFactory bufferFactory = response.bufferFactory();
            response.getHeaders().add(HttpHeaders.CONTENT_DISPOSITION, "inline;fileName=" + URLEncoder.encode(gridFsFile.getFilename(), StandardCharsets.UTF_8));
            return response.writeWith(Mono.from(publisher).map(bufferFactory::wrap));
        }).flatMap(Function.identity());
    }
}
```

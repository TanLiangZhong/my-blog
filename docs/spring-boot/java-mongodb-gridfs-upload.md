---
title: java 基于 MongoDB GridFS 实现文件服务器
date: '2020-12-20'
sidebar: 'auto'
categories:
- 后端
tags:
- spring-boot
- mongodb
publish: true
---

### 1.MongoDB GridFS 简介
> * GridFS是用于存储和检索超过16 MB BSON文档大小限制的文件   
> * GridFS 会将大文件对象分割成多个小的chunk(文件片段),一般为256k/个,每个chunk将作为MongoDB的一个文档(document)被存储在chunks集合中。


### 2.何时使用GridFS
> * 如果文件系统限制了目录中文件的数量，则可以使用GridFS来存储所需数量的文件。   
> * 当您要访问大文件部分的信息而不必将整个文件加载到内存中时，可以使用GridFS来调用文件的某些部分，而无需将整个文件读入内存。   
> * 当您想要使文件和元数据自动同步并在多个系统和设施中部署时，可以使用GridFS。使用地理上分散的副本集时，MongoDB可以自动将文件及其元数据分发到许多 mongod实例和设施。   
> * 如果文件都小于16 MB的限制，请考虑将每个文件存储在单个文档中，而不要使用GridFS。您可以使用BinData数据类型存储二进制数据。

本文 mongodb 只做简单介绍, 详细小伙伴们看去都官方文档。文章结尾有链接

### 3. Docker安装MongoDB
```shell
docker run -itd --name mongo -p 27017:27017 mongo:latest
```
### 4. 实现思路
* 使用 MongoDB GridFS 存储文件
* 使用 SpringBootDataMongoDB 读写GridFS.
* 通过流的方式可以对文件预览或下载

### 5. 实现功能
* 文件上传
* 批量上传
* 文件预览
* 文件下载
* 分片上传
* 断点续传上传 TODO 待实现
* 断点续传下载 TODO 待实现

### 6. 核心代码
> 代码较多, 只贴了部分核心代码, 感兴趣的小伙伴可以下载源码阅读。[源码下载](https://github.com/TanLiangZhong/elucidator-file-server#readme)

##### 6.1 上传文件
```java
    public FileUploadVo upload(MultipartFile file) {
        try {
            String fileName = Optional.ofNullable(file.getOriginalFilename()).orElse(file.getName());
            Document metadata = new Document()
                    .append(BaseConstants.FILE_METADATA_CONTENT_TYPE, file.getContentType())
                    .append(BaseConstants.FILE_METADATA_SUFFIX, fileName.substring(fileName.lastIndexOf(".")));
            ObjectId objectId = gridFsTemplate.store(file.getInputStream(), fileName, metadata);
        } catch (Exception e) {
            log.info("upload file exception <<<=== ", e);
            throw new BusinessException("File upload failed！Error: " + e.getMessage());
        }
    }
```
##### 6.2 文件预览
```java
    @ApiOperation("文件预览")
    @GetMapping("preview/{id}.*")
    public void previewV2(@PathVariable String id, HttpServletResponse response) {
        try (OutputStream out = response.getOutputStream()) {
            GridFSFile gridFSFile = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(id)));
            if (gridFSFile != null) {
                Document document = Optional.ofNullable(gridFSFile.getMetadata()).orElse(new Document());

                response.setCharacterEncoding("UTF-8");
                response.addHeader(HttpHeaders.CONTENT_DISPOSITION, "inline;fileName=" + URLEncoder.encode(gridFSFile.getFilename(), StandardCharsets.UTF_8));
                response.addHeader(HttpHeaders.CONTENT_TYPE, Optional.ofNullable(document.getString(BaseConstants.FILE_METADATA_CONTENT_TYPE)).orElse("image/jpeg"));
                response.addHeader(HttpHeaders.CONTENT_LENGTH, String.valueOf(gridFSFile.getLength()));

                gridFSBucket.downloadToStream(gridFSFile.getObjectId(), out);
            } else {
                out.write(JSON.toJSONString(ApiResult.error("file does not exist!")).getBytes(StandardCharsets.UTF_8));
            }
        } catch (Exception e) {
            log.error("预览文件异常", e);
        }
    }
```
##### 6.3 分片上传
> 实现思路, 参照 `gridFsTemplate.store` 方法, 重新实现对`files`,`chunks`的操作
```java

    @Override
    public FileUploadVo uploadPart(UploadPartBo part) {
        log.info("uploadPart ===>>> part: {}, chunkSize: {}, ContentType: {}", part, part.getFile().getSize(), part.getFile().getContentType());
        try {
            MultipartFile file = part.getFile();
            if (StringUtils.hasText(part.getFileId())) {
                // TODO 块验证
                ObjectId objectId = new ObjectId(part.getFileId());
                writeChunk(new BsonObjectId(objectId), part.getChunkIndex(), file.getBytes());
                return FileUploadVo.builder().fileId(objectId.toHexString()).build();
            } else {
                ObjectId objectId = new ObjectId();
                BsonValue fileId = new BsonObjectId(objectId);

                String fileName = part.getName();
                Document metadata = new Document()
                        .append(BaseConstants.FILE_METADATA_CONTENT_TYPE, file.getContentType())
                        .append(BaseConstants.FILE_METADATA_SUFFIX, fileName.substring(fileName.lastIndexOf(".")));
                log.info(" --metadata--  {}", metadata);

                MongoCollection<GridFSFile> filesCollection = getFilesCollection(mongoClient.getDatabase(mongoProperties.getGridfs().getDatabase()), mongoProperties.getGridfs().getBucket());
                GridFSFile gridFSFile = new GridFSFile(fileId, fileName, part.getSize(), part.getChunkSize(), new Date(), metadata);
                filesCollection.insertOne(gridFSFile);
                writeChunk(fileId, part.getChunkIndex(), file.getBytes());

                return FileUploadVo.builder()
                        .fileId(objectId.toHexString())
                        .name(fileName)
                        .size(part.getSize())
                        .contentType(metadata.getString(BaseConstants.FILE_METADATA_CONTENT_TYPE))
                        .suffix(metadata.getString(BaseConstants.FILE_METADATA_SUFFIX))
                        .previewUrl(fsProperties.getBasePreviewUrl() + "/preview/" + objectId.toHexString() + metadata.getString(BaseConstants.FILE_METADATA_SUFFIX))
                        .build();
            }
        } catch (IOException e) {
            log.error("fragment upload exception <<<=== part: {}, msg: {}", part, e.getMessage());
            throw new BusinessException("Fragment upload failed！Error: " + e.getMessage());
        }
    }

    private void writeChunk(BsonValue fileId, Integer chunkIndex, byte[] bytes) {
        log.info("writeChunk ===>>> fileId: {} , chunkIndex: {} , length: {} ", fileId, chunkIndex, bytes.length);
        MongoCollection<Document> chunksCollection = getChunksCollection(mongoClient.getDatabase(mongoProperties.getGridfs().getDatabase()), mongoProperties.getGridfs().getBucket());
        chunksCollection.insertOne(new Document("files_id", fileId).append("n", chunkIndex).append("data", new Binary(bytes)));
    }

    private static MongoCollection<GridFSFile> getFilesCollection(final MongoDatabase database, final String bucketName) {
        return database.getCollection(bucketName + ".files", GridFSFile.class).withCodecRegistry(
                fromRegistries(database.getCodecRegistry(), MongoClientSettings.getDefaultCodecRegistry())
        );
    }

    private static MongoCollection<Document> getChunksCollection(final MongoDatabase database, final String bucketName) {
        return database.getCollection(bucketName + ".chunks").withCodecRegistry(MongoClientSettings.getDefaultCodecRegistry());
    }

```

代码较多大家可以下载源码阅读。若有不对地方还请大家多多指教，持续更新中....

### 相关文档
* [MongoDB GridFS 手册](https://docs.mongodb.com/manual/core/gridfs/)
* [Docker Hub Mongo](https://hub.docker.com/_/mongo)

### [源码下载](https://github.com/TanLiangZhong/elucidator-file-server#readme)
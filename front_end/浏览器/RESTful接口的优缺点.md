## RESTful 接口的优缺点

### **什么是 restful 接口 ？**

REST -- REpresentational State Transfer，英语的直译就是 “表现层状态转移”，它包含以下三个方面：

- URL 设计: RESTful 的核心思想就是，客户端发出的数据操作指令都是"动词 + 宾语"的结构。比如，GET /articles 这个命令，GET 是动词，/articles 是宾语。

  动词通常就是五种 HTTP 方法，对应 CRUD 操作。

  - GET：读取（Read）
  - POST：新建（Create）
  - PUT：更新（Update）
  - PATCH：更新（Update），通常是部分更新
  - DELETE：删除（Delete）

- 状态码: 客户端的每一次请求，服务器都必须给出回应。回应包括 HTTP 状态码和数据两部分。

- 服务器回应: API 返回的数据格式，不应该是纯文本，而应该是一个 JSON 对象，因为这样才能返回标准的结构化数据。所以，服务器回应的 HTTP 头的 `Content-Type` 属性要设为 `application/json。`

### **优点**

简洁明了，一目了然；轻量，直接通过 http，不需要额外的协议，post/get/put/delete 操作

### **缺点**

当一次更新的内容多的时候需要调用更多的接口。删除也是，如果我想批量删除呢？

1. 对后端开发人员要求高，业务逻辑有时难以被抽象为资源的增删改查。

2. 对前端开发人员不友好，API 粒度较粗，难以查询符合特殊要求的数据，同样的业务要比普通的 API 需要更多次 HTTP 请求。

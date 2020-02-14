## AST 抽象语法树

### 什么是 AST（抽象语法树）？

> It is a hierarchical program representation that presents source code structure according to the grammar of a programming language, each AST node corresponds to an item of a source code.
>
> 它是一种分层程序表示，它根据编程语言的语法呈现源代码结构，每个 AST 节点对应一个源代码项。

Babel,Webpack，vue-cli 和 esLint 等很多的工具和库的核心都是通过 Abstract Syntax Tree (抽象语法树)这个概念来实现对代码的检查、分析等操作的。

解析（parsing），转译（transforming），生成（generation）。

将源码解析成 AST 抽象语法树，再对此语法树进行相应的转译，最后生成我们所需要的代码。

第三方的生成 AST 库有很多，这里推荐几个——esprima, babylon(babel 使用)

其转化的内容大致是这样的：

```json
{
  "type": "Program",
  "start": 0,
  "end": 16,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 16,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 12,
        "name": "ast"
      },
      "expression": false,
      "generator": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 14,
        "end": 16,
        "body": []
      }
    }
  ],
  "sourceType": "module"
}
```

### AST 的使用场景

- 代码语法的检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等
- 代码混淆压缩
- 优化变更代码，改变代码结构使达到想要的结构

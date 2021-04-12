# Deno是什么

![deno1.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/406bc5554be8446c9d333855663816ed~tplv-k3u1fbpfcp-watermark.image)

Deno是[JavaScript](https://www.javascript.com/)、[TypeScript](https://www.typescriptlang.org/)、[Webassembly](https://webassembly.org/)的运行时环境。

>  Deno是node的变位词，其发音是恐龙（dinosaur）的缩写读音"蒂诺"。

它是建立在：

- [Rust](https://www.rust-lang.org/zh-CN/)（Deno是用Rust开发，Node是用C++）
- [Tokio](https://tokio-zh.github.io/)（Deno的事件机制是基于Tokio，Node是基于libuv）
- [TypeScript](https://www.typescriptlang.org/)
- [V8](https://v8.dev/)

# Deno的背景

![deno演讲.png](attachment:d450554db0b73a6f268a83ff788c955f)

Deno起源于NodeJS的创建者**Ryan Dahl**，这也是大家对Deno项目充满期待的原因之一。在JSConfEu上，Dahl在他的的[演讲](https://www.youtube.com/watch?v=M3BM9TB-8yA&vl=en)中说出了自己对node中存在的一些缺陷，并解释了如何围绕Node.js的架构做出更好的决定，在演讲的最后，宣布了Deno的第一个原型，并承诺构建一个更好、更安全的运行时环境。

# Deno的架构

![deno源码.webp](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4eafcac1b8374487adbcfc92ce706749~tplv-k3u1fbpfcp-watermark.image)

1. Deno以Rust作为启动入口，通过Rust FFI去执行C++代码，然后在C++中引入V8实例。
2. 初始化V8对象以及注入外部C++方法，例如send、recv等方法。
3. 向V8全局作用域下注入Deno对象，暴露Deno的一些基本API给JavaScript。
4. 通过绑定在V8上的C++方法，调用对应的Rust方法，去执行底层逻辑。

不难发现Deno其实和RN、Flutter这些框架很类似，因为它本质上也是跑了个 js 引擎，只是这个 js 引擎是 v8，不负责 UI 的 binding 而已。所以说架构的本质就是思路复刻、模块重组。

# Node的缺陷

## 缺少Promise

Nodejs最大的亮点在于事件驱动， 非阻塞I/O 模型，这使得Nodejs具有很强的并发处理能力，非常适合编写网络应用。在Nodejs中大部分的I/O操作几乎都是异步的，于是乎Callback Hell产生了:

```javascript
// http.js
const http = require('http');
http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(8888);

// fs.js
const fs = require('fs');
const myFile = '/tmp/test';

fs.readFile(myFile, 'utf8', (err, txt) => {
    if (err) return console.log(err);
    txt = txt + '\nAppended something!';
    fs.writeFile(myFile, txt, (err) => {
        if(err) return console.log(err);
        console.log('Appended text!');
    });
});
```

## 缺少安全性

在Node.js中，可以调用fs.chmod来修改文件或目录的读写权限。说明Node运行时的权限是很高的。如果你在Node中导入一份不受信任的软件包，那么很可能它将删除你计算机上的所有文件。所以说Node缺少安全模块化运行时。

```javascript
const fs = require('fs');
//删除hello.txt
fs.unlinkSync('./hello.txt');
// 删除css文件夹
fs.rmdirSync('./css');
```

## 构建系统与Chrome存在差异

![v8编译.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9a8bb94e1fd42bc8c5f66707a7c7a45~tplv-k3u1fbpfcp-watermark.image)

首先我们需要了解构建系统是啥？

写惯前端的童鞋可能不是很明白这个东西是干啥用的？但是其实平时你都会接触到，只是概念不同而已。前端我们一般称其为打包构建，类似工具诸如webpack、rollup、parcel做的事情。它们最后的目标其实都是想得到一些目标性的文件，这里我们的目标是[编译V8](https://v8.dev/docs/build-gn)代码。

Node的V8构建系统是[GYP](https://gyp.gsrc.io/)（Generate Your Projects），而chrome的V8已升级为[GN](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md)（Generate Ninja）。GN的构建速度比GYP快20倍，因为GN是用C++编写，比起用 python写的GYP快了很多。但是node底层架构已无法挽回。

## 复杂的包管理模式

![deno模块太阳.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b83ab64e54a4bd1862abf63da55a8d1~tplv-k3u1fbpfcp-watermark.image)

Node自带的NPM生态系统中，由于严重依赖语义版本控制和复杂的依赖关系图，少不了要与package.json、node_modules打交道。node_modules的设计虽然能满足大部分的场景，但是其仍然存在着种种缺陷，尤其在前端工程化领域，造成了不少的问题。特别是不同包依赖版本不一致时，各种问题接踵而来，于是乎yarn lock、npm lock闪亮登场，然而还是有很多场景时lock无法覆盖的，比如当我们第一次安装某个依赖的时候，此时即使第三方库里含有lock文件，但是npm install|(yarn install) 也不会去读取第三方依赖的lock，这导致第一次创建项目的时候，还是会可能会触发bug。而且由于交叉依赖，node_modules大的一发不可收拾。

## 读取文件复杂化

Nodejs使用require引用其他脚本文件，先介绍 [require](https://nodejs.org/api/modules.html#modules_all_together) 语句的内部逻辑：

```javascript
当 Node 遇到 require(X) 时，按下面的顺序处理。
（1）如果 X 是内置模块（比如 require('http'）)
　　a. 返回该模块。
　　b. 不再继续执行。

（2）如果 X 以 "./" 或者 "/" 或者 "../" 开头
　　a. 根据 X 所在的父模块，确定 X 的绝对路径。
　　b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
      X
      X.js
      X.json
      X.node
　　c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
      X/package.json（main字段）
      X/index.js
      X/index.json
      X/index.node
      
（3）如果 X 不带路径
　　a. 根据 X 所在的父模块，确定 X 可能的安装目录。
　　b. 依次在每个目录中，将 X 当成文件名或目录名加载。

（4） 抛出 "not found"
```

可以看得出来，require的读取逻辑是很复杂的，虽然用起来很可爱，但是没必要。

# Deno的特点

## 安全

![deno-sec.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1eba6240466f4b028094b5b83988a93b~tplv-k3u1fbpfcp-watermark.image)

与Node.js相反，Deno默认在沙箱中执行代码，这意味着运行时无法访问以下权限：

- 文件系统
- 网络
- 环境变量

你可以通过命令行参数形式来开启默认关闭的权限，类似下面这样：

```javascript
// 授予从磁盘读取和侦听网络的权限
deno run --allow-read --allow-net https://deno.land/std/http/file_server.ts

// 授予从磁盘filepath读取白名单文件的权限
deno run --allow-read=/etc https://deno.land/std/http/file_server.ts

// 授予所有权限
deno run --allow-all https://deno.land/std/http/file_server.ts

```

或者通过编程形式控制权限，类似下面这样：

```javascript
// 检测是否有读取权限
const status = await Deno.permissions.query({ name: "write" });
if (status.state !== "granted") {
  throw new Error("need write permission");
}

// 读取log文件
const log = await Deno.open("request.log", "a+");

// 关闭读写权限
await Deno.permissions.revoke({ name: "read" });
await Deno.permissions.revoke({ name: "write" });

// 打印log内容
const encoder = new TextEncoder();
await log.write(encoder.encode("hello\n"));
```

## 内置工具

![x](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72f2f73a5837421781d20c1dd54953b3~tplv-k3u1fbpfcp-zoom-1.image)

Deno目前提供了以下内置工具，在使用JavaScript和TypeScript时非常有用，只需要执行以下命令即可:

- [deno bundler](https://deno.land/manual@v1.8.3/tools/bundler) (自带打包和tree shaking功能，可以将我们的代码打包成单文件)
- [deno compile](https://deno.land/manual@v1.8.3/tools/compiler) (将Deno项目构建为完全独立的可执行文件)
- [deno installe](https://deno.land/manual@v1.8.3/tools/script_installer) (可以将我们的代码生成可执行文件进行直接使用)
- [deno info](https://deno.land/manual@v1.8.3/tools/dependency_inspector) (查看所有模块的依赖关系树)
- [deno doc](https://deno.land/manual@v1.8.3/tools/documentation_generator) (将源代码中的注释生成文档)
- [deno fmt](https://deno.land/manual@v1.8.3/tools/formatter) (递归地格式化每个子目录中的每个文件)
- [deno repl](https://deno.land/manual@v1.8.3/tools/repl) (启动一个read-eval-print-loop，它允许您在全局上下文中交互式地构建程序状态)
- [deno test](https://deno.land/manual@v1.8.3/testing) (对名为 .test 的文件进行单元测试)
- [deno lint](https://deno.land/manual@v1.8.3/tools/linter) (代码检测器)

## 支持TyprScript

![tsbanner.jpeg](attachment:4a85a073f61d6e9d1c8a3e8e7b9df94d)

使用 Deno 运行 TypeScript 代码不需要编译步骤以及繁琐的配置文件——Deno 会自动为你执行这一步骤。

[源码](https://github.com/denoland/deno/tree/main/cli/tsc)中我们发现，deno其实是集成了一个 TypeScript 编译器和一个用于运行时快照的小型编译器主机。转换的[核心代码](https://github.com/denoland/deno/blob/main/cli/tsc.rs)如下：

```javascript
// globalThis.exec 这个函数在/cli/tsc/99_main_compiler.js中
// 其主要作用就是把TypeScript转换成JavaScript
let exec_source = format!("globalThis.exec({})", request_str);

  runtime
    .execute("[native code]", startup_source)
    .context("Could not properly start the compiler runtime.")?;
  runtime.execute("[native_code]", &exec_source)?;
```

前段时间Deno内部把ts改回js的讨论很是热闹，但并不意味着Deno放弃了TypeScript，它依然是一个安全的 TS/JS runtime。

例如：

```javascript
// index.ts
const str: string = 'hello word';
console.log(str);
```

你可以直接在命令行运行并打印出hello word：

```javascript
deno run index.ts
```

## 支持 ES 模块标准

Deno采用的是ES Module的浏览器实现。[ES Module](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)大家应该都是比较熟悉的，它是JavaScript官方的标准化模块系统，其浏览器实现如下所示：

```javascript
// 从 URL 导入
import React from "https://cdn.bootcdn.net/ajax/libs/react/17.0.1/cjs/react-jsx-dev-runtime.development.js";
// 从相对路径导入
import * as Api from "./service.js";
// 从绝对路径导入
import "/index.js";
```

需要注意的是，Deno不支持以下写法：

```javascript
import foo from "foo.js";
import bar from "bar/index.js";
import zoo from "./index"; // 没有后缀
```

## 兼容浏览器API

![chromebanner.png](attachment:f2d35198b26eaf1f8d21d51458f25ea2)

Deno 通过与浏览器 API 保持一致，来减少大家的认知。

- 模块系统：从上面的介绍看出 Deno 是完全遵循浏览器实现的。
- 默认安全
- 对于异步操作返回 Promise
- 使用 ArrayBuffer 处理二进制
- 存在 window 全局变量
- 支持 fetch、webCrypto、worker 等 Web 标准，也支持 onload、onunload、addEventListener 等事件操作函数

```javascript
console.log(window === this, window === self, window === globalThis); // true true true
```

## 支持Promise

![promisebanner.png](attachment:9f70fae8d880d65cdb39909cc7dc72a0)

Deno 所有的异步操作，一律返回 Promise，并且全局支持await。

```javascript
// 读取异步接口数据
const response = await fetch("http://my.json.host/data.json");
console.log(response.status)
console.log(response.statusText);
const jsonData = await response.json();

// 读取文件
const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("hello.txt");
console.log(decoder.decode(data));
```

## 去中心化包

Deno 没有 package.json、node_modules，那么它是怎么进行包管理的呢？我们先看下面的例子：

```javascript
// index.js
import { white, bgRed } from "https://deno.land/std/fmt/colors.ts";
console.log(bgRed(white("hello world!")));

// 命令行执行
> deno run index.js
Download https://deno.land/std/fmt/colors.ts
Compile https://deno.land/std/fmt/colors.ts
hello world!
```

我们看到执行时会有 `Download` 和 `Compile` 两个步骤，于是乎我们会产生几个疑问：

**1、每次执行都要下载吗？**

答：不需要每次下载，有缓存机制。

```javascript
> deno run index.js
hello world!
```

**2、Download 和 Compile 的文件在哪里呢？**

答：我们可以通过上面介绍的自带工具deno info来查看依赖关系。

```javascript
> deno info index.js
local: /Users/xxx/Desktop/index.ts
type: TypeScript
emit: /Users/xxx/Library/Caches/deno/gen/file/Users/xxx/Desktop/index.ts.js
dependencies: 0 unique (total 41B)

file:///Users/xxx/Desktop/index.ts (41B)
```

**3、依赖代码更新了怎么办？**

答：当依赖模块更新时，我们可以通过 `--reload` 进行更新缓存，例如：

```javascript
> deno run --reload index.js
// 通过白名单的方式更新部分依赖
> deno run --reload=https://deno.land index.js
```

**4、多版本怎么处理？**

答：暂时没有好的解决方案，只能通过 git tag 的方式区分版本。

Deno是通过URL导入代码，可以在互联网上的任何地方托管模块。无需集中注册表即可分发Deno软件包。不需要package.json文件和依赖项列表，因为所有模块都是在应用程序运行时下载，编译和缓存的。

# 上手Deno

## 安装

使用 Shell (macOS 和 Linux):

```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

使用 PowerShell (Windows):

```
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

运行 **deno --version**，如果它打印出 Deno 版本，说明安装成功。

```javascript
> deno --version
deno 1.8.1 (release, aarch64-apple-darwin)
v8 9.0.257.3
typescript 4.2.2
```

## demo测试

### Hello Word

本地创建一个index.ts文件，内容如下所示：

```javascript
// index.ts
console.log("Welcome to Deno 🦕");
```

打开终端，输入以下命令行：

```javascript
> deno run index.ts
```

以上输出 "Welcome to Deno 🦕"。

###  HTTP 请求

本地创建一个http.ts文件，内容如下所示：

```javascript
const url = Deno.args[0]; // 取得第一个命令行参数，存储到变量 url。
const res = await fetch(url); // 向指定的地址发出请求，等待响应，然后存储到变量 res。
const body = new Uint8Array(await res.arrayBuffer()); // 把响应体解析为一个 ArrayBuffer，等待接收完毕，将其转换为 Uint8Array，最后存储到变量 body。
await Deno.stdout.write(body); // 把 body 的内容写入标准输出流 stdout。
```

打开终端，输入以下命令行：

```javascript
deno run --allow-net=api.github.com http.ts https://api.github.com/users/answer518
```

以上输出json对象。

### 远程导入

从远程模块导入**add**和**multiply**方法：

```javascript
import {
  add,
  multiply,
} from "https://x.nest.land/ramda@0.27.0/source/index.js";

function totalCost(outbound: number, inbound: number, tax: number): number {
  return multiply(add(outbound, inbound), tax);
}

console.log(totalCost(19, 31, 1.2)); // 60
console.log(totalCost(45, 27, 1.15)); // 82.8
```

# 结束语

Deno是一个非常伟大的项目，但却不是 **“下一代Nods.js”**。Ryan Dahl自己也说： **“Node.js isn't going anywhere”** 。并且Deno 还处在开发中，功能还不稳定，不建议用于生产环境。但是，它已经是一个可用的工具，有很多新特性都是Node所没有的，大家可以多多试玩。

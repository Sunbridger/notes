# Seo 服务 - Breeze



| 里程碑 | 计划时间 | 实际完成时间 | 进度 | 开发 | 备注 |
| --- | --- | --- | --- | --- | --- |
| v0.1.0 | 2018-10-13日 | 已完成 | 需求评审 | 王宽 |  |
|  |  |  |  |  |  |

<a name="84fba1b6"></a>
## 现状
国内的许多搜索引擎，如百度等，在爬取页面的时候，对于SPA的单页面应用非常不友好。<br />目前[公司的方案](https://souche.yuque.com/wireless-share/4593011/7149136)是使用谷歌的[puppeteer](https://github.com/GoogleChrome/puppeteer)，目前应用在弹个车的PC站和M站。<br />之前架构组做了一套，目前打算交接过来进行维护。<br />[老的服务代码](http://git.souche.com/souche-f2e/prespider)是用KOA1写的，异步任务使用的是youmu。

<a name="73e82552"></a>
## 目标
能对线上的C端的网站，提供稳定的seo预渲染服务，给爬虫提供正常的页面代码。保证公司业务的seo服务稳定正常运行。

<a name="93c333e7"></a>
## 架构分层

![image.png](https://cdn.nlark.com/yuque/18/2019/png/138411/1552706579183-de282607-e27f-4524-b19c-11f1d83f82d0.png#align=left&display=inline&height=261&name=image.png&originHeight=329&originWidth=564&size=9121&status=done&width=448)
<a name="13418d2a"></a>
## 整流程图

![seo流程图 (4).png](https://cdn.nlark.com/yuque/18/2019/png/192303/1554082565357-86223f9d-68e0-4832-9621-7974e4560102.png#align=left&display=inline&height=1040&name=seo%E6%B5%81%E7%A8%8B%E5%9B%BE%20%284%29.png&originHeight=1910&originWidth=1370&size=229243&status=done&width=746)
<a name="5639f70c"></a>
## 入口
<a name="b299be24"></a>
### 用户正常请求
用户在正常访问时，获取页面的内容是<br /> `<div id="app"></div>`
<a name="e9c830b1"></a>
### 爬虫请求
如果是爬虫进来，在检测浏览器头信息中包含bot或者spider 信息时，即认为是爬虫访问，此时，nginx会改该请求定位到Breeze服务，等待Breeze来返回页面内容信息。

<a name="bdf0097c"></a>
## 服务配置
如果一个项目需要进行seo服务优化，需要做两个事情：
<a name="e3538f3e"></a>
### 1：nginx配置
在url满足某些匹配规则的情况下，nginx会在爬虫头的情况下，去Breeze获取页面内容，进行返回。<br />例如：在www.tangehe.com/* 的规则下，nginx会将请求重定向到Breeze，等到Breeze服务器的返回。
<a name="b6ecc26e"></a>
### 2：Breeze配置
在需要seo项目的package.json里增加breeze配置，(**需要权限判定 ??)**配置项如下:

```
// package.json

breeze: {
	entry: 'https://www.tangeche.com',
	whitePath: ['/foo/bar'],
	ignorePath: ['/test/1'],
	ignoreParams: ['spm'],
	moduleName: '弹个车pc站'
}
```

| 参数 | 说明 | 是否必填 | 类型  |
| --- | --- | --- | --- |
| entry | 项目生产环境的主入口 | 是 | string |
| moduleName | 项目名称，取package.json name | 是 | string |
| whitePath | 路由白名单，配置无法通过爬取a标签href的路由 | 否 | array |
| ignorePath | 需要忽略路由，配置不想被搜索引擎爬取的路由 | 否 | array |
| ignoreParams | 配置url上忽略的参数，使不同参数的路由被视为相同的地址 | 否 | array |

打包时，通过robben读取配置，数据落地在Breeze。然后即刻触发获取页面Seo的任务。

**策略：**<br />1：url发生变化，会去触发，无用的参数，不会即时触发。<br />2：入口域名不允许相同<br />**定时更新：**<br />每天凌晨4点，会定时去触发进行更新页面内容配置，更新结果会在每天的10点，通知到项目的负责人。

<a name="3cd89382"></a>
### 3：项目内路由跳转优化
搜索引擎在深度爬取网页的过程中，会去查找页面的a标签，并且根据href路由爬取下一个页面，一直到所有页面的a标签爬取并且跳转完成停止。但是目前项目中存在很多跳转的代码，没有使用a标签，而是使用js的一些路由方法进行跳转，这样非常不利于seo。还有一种情况，当我们使用hash模式时，搜索引擎只会读取#前面的路由而忽略之后的，这样的话只有根目录的html会被爬取，同样是不利于seo的，以下是两个优化的办法

1. 路由的跳转尽量使用<router-link> <a>标签，使搜素引擎能够顺利的爬取
1. 尽量使用history路由，如果使用hash路由，将#更换成#!符号，这样引擎能够成功识别并且深层爬取

针对这个问题，breeze后续可以做的事情：<br />通过[puppeteer](https://github.com/GoogleChrome/puppeteer)去获取页面的js，匹配一些常用的跳转方法，例如.push, .$goPage, 拿到跳转path获取name，通过读取项目的路由配置进行匹配，获取完整的页面的地址。

通过robben获取负责人信息进行异常通知



<a name="66d4756b"></a>
## SEO服务 - Jenkins
<a name="f60cfc40"></a>
### 1：主流程
在拿到页面的url以后，调用jenkins任务，获取到页面的异步内容，拿到所有子页面的内容，然后上传到maven上面，然后返回文件的下载地址。<br />入参：

| key | 类型 | 是否必传 | 描述 |
| --- | --- | --- | --- |
| taskId | String | 是 | 任务的id |
| url | String | 是 | 任务的url |
| ignoreParams | String | 否 | 忽视的参数 |

<a name="5f65fdd3"></a>
### 2：爬取流程图

![image.png](https://cdn.nlark.com/yuque/18/2019/png/138411/1552707354897-0af9436e-0084-454d-a5f3-894ff4517a93.png#align=left&display=inline&height=833&name=image.png&originHeight=1169&originWidth=490&size=49404&status=done&width=349)
<a name="ee17d396"></a>
#### 举例：
打开https://www.tangeche.com/ 页面的时候，首先生成配置文件 finance-f2e/finance-tangeche-pc&seo1.json
```javascript
{
		"main": "/",
    "fileName": "1&1" // 后面可以看到具体规则
}
```
然后使用[puppeteer](https://github.com/GoogleChrome/puppeteer),获取到页面的内容，然后将页面的内容存储到 1&1.html 文件中。<br />解析页面内容，获取页面所有a标签的href数据。<br />**整理href数据**，得到所有的http路径，处理规则如下：<br />绝对路径：直接在前面加上浏览器的域名<br />相对路径：根据爬取页面的url来进行定位<br />http路径：直接推到数组中<br />**过滤数据：**得到整个数据，然后根据ignoreParams参数，来整理href，并判断这些href是否已经在  finance-f2e/finance-tangeche-pc&seo1.json 中包含，如果已包含，剔除数据。模拟得到如下数据


如此反复，进行递归爬取。一直爬取都无数据时，停止循环。<br />提前将路径解析出来存储在数据库，从maven获取zip包之后找到对应路由，获取html文件

1. 解析数据后什么时候插入数据库，是每处理一条还是所有处理好之后同一插入
1. 第二次爬取的时候，什么时候替换老数据
1. 解析ignoreParams 第一次保存有query的路由，第二次解析到了之后，删除这个参数，并且保存，之后解析到的数据都删除参数和之前的参数做对比，完全相同则认为是同一路由
1. 爬虫进来时，zip包提前下载解压放哪?
1. 如果两个路由同时都有一个配置的忽略参数，一个需要忽略另一个不忽略怎么办？

将解析出来的html文件和json文件，压缩到 finance-f2e/finance-tangeche-pc&seo1.zip 中，然后上传到maven。回调Breeze调用接口。
<a name="858e6b90"></a>
## 爬虫访问
nginx请求过来，访问Breeze的接口，匹配到对应的文件，返回Breeze接口。<br />如果Robben没有配置，Breeze会返回页面的正常内容，404则返回404.
<a name="b5373650"></a>
## 服务保障
<a name="9aff6241"></a>
### 监控
另外启动一套SEO检测服务。定期对爬虫页面进行请求，判断服务是否正常
<a name="b41dcb50"></a>
### 压力测试
爬虫服务，可能会收到大量密集请求。要求能抗住短时间内，万级以上的请求。接口要保持稳定。
<a name="ebfeadf6"></a>
## 后续规划
<a name="16b6f8e9"></a>
### seo优化检测服务
对seo内容进行优化检测，在预发环境时提前对页面内容进行判断，是否符合seo标准，如果不符合标准，需要在上线之前进行更正，并且修正之前每天对项目负责人推送警告。

seo优化检测策略:

1.  匹配html文件中有无<title>标签，seo重要程度 p0
1.  匹配有无 <meta name="description" content="Your content">标签 ，seo重要程度 p0
1.  匹配有无<meta name="keywords" content="keywords, separated, by, comma">关键字标签 seo重要程度p0
1. 匹配html文件中有无 <link rel="icon" href="iconPath"> , 用作显示favicon， seo重要程度p1
1. 匹配html中<a>标签的href是否有值，这影响到引擎爬虫是否能够进行子页面深度爬取，重要程度p1
1. 匹配有无 <meta itemprop="name" content="">, <meta itemprop="description" content="">， 这个标签内容和上述1，2类似，但是是为了Google+搜索做的适配，重要程度p3


官方文档<br />puppeteer：[https://zhaoqize.github.io/puppeteer-api-zh_CN/#/](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)<br />jenkins: [https://jenkins.io/zh/doc/#doc/pipeline/tour/getting-started#](https://jenkins.io/zh/doc/#doc/pipeline/tour/getting-started#)<br />Egg: [https://eggjs.org/zh-cn/intro/quickstart.html](https://eggjs.org/zh-cn/intro/quickstart.html)<br />蓝风（搜车基于egg封装的）：[https://blue-windy-doc.souche-inc.com/#/./README](https://blue-windy-doc.souche-inc.com/#/./README)<br />TS：[https://www.tslang.cn/docs/handbook/basic-types.html](https://www.tslang.cn/docs/handbook/basic-types.html)

# 管理后台模板

> 这是一个基于Vue和Element UI的管理后台，目前兼容Element UI最新版本2.3.9，后期还将加入一些其他组件库中的组件，比如iView中有的但Element UI不具备的。
## 项目目录结构
```
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── icons                  // 项目所有 svg icons
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── views                   // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 构建

``` bash

# 拉取项目
git clone xxxxxgit

# 安装依赖
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 运行开发模式
npm run dev

# 构建打包
npm run build

```

## 开发时的约定

### api 和 views
要根据业务模块来划分 views，并且 将views 和 api 两个模块一一对应，从而方便维护。如下图：

![Image](https://github.com/yidongkaifa/admin/blob/master/readme_images/100363-f20763ff167eb1a4.png)

如 article 模块下放的都是文章相关的 api，这样不管项目怎么累加，api和views的维护还是清晰的，
### components



这里的 components 放置的都是全局公用的一些组件，如上传组件，富文本等等。一些页面级的组件建议还是放在各自views文件下，方便管理。如图：


### store
不要为了用 vuex 而用 vuex。如果业务之间的耦合度低，根本没有必要使用 vuex 来存储data，每个页面里存放自己的 data 就行。当然有些数据还是需要用 vuex 来统一管理的，如登录token,用户信息，或者是一些全局个人偏好设置等，还是用vuex管理更加的方便，具体当然还是要结合自己的业务场景的。总之还是那句话，不要为了用vuex而用vuex！

### alias

当项目逐渐变大之后，文件与文件直接的引用关系会很复杂，这时候就需要使用alias 了。
有的人喜欢alias 指向src目录下，再使用相对路径找文件

```
resolve: {
  alias: {
    '~': resolve(__dirname, 'src')
  }
}

//使用
import stickTop from '~/components/stickTop'
```
### ESLint

不管是多人合作还是个人项目，代码规范是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。

### 封装 axios
我们经常遇到一些线上 的bug，但测试环境很难模拟。其实可以通过简单的配置就可以在本地调试线上环境。
这里结合业务封装了axios 

```
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => response,
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service


```

```
import request from '@/utils/request'

//使用
export function getInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  });
}


```

后台项目的每一个请求都是要带 token 来验证权限的，这样封装以下的话我们就不用每个请求都手动来塞 token，或者来做一些统一的异常处理，一劳永逸。
而且因为我们的 api 是根据 env 环境变量动态切换的，如果以后线上出现了bug，我们只需配置一下 @/config/dev.env.js 再重启一下服务，就能在本地模拟线上的环境了。

```

module.exports = {
    NODE_ENV: '"development"',
    BASE_API: '"https://api-dev"', //修改为'"https://api-prod"'就行了
    APP_ORIGIN: '"https://www.xxx.com"'
}

```

### 跨域问题
开发过程中可使用反向代理服务器来解决跨域问题

https://github.com/yidongkaifa/easy-proxsy

### 前后端的交互和联调问题
平时的开发中交流成本占据了很大一部分时间，但前后端如果有一个好的协作方式的话能解决很多时间。建议开发流程前后端和产品一起开会讨论项目，之后根据需求后端开始建模，前端开始整理接口数据格式并在confluence上写好接口文档，后端结合数据模型在confluence上把接口文档做出修正，然后前后端并行开发。

## 代码规范

### 基于element开发
如果element组件不能完全满足需求，就需要在element组件基础上进行二次开发
具体可参考本项目提供的二次开发示例，基于element的el-row打造我们自己的dic-row组件

element的el-row组件的源码在的node_modules/element-ui/packages/row下面

完成的dic-row组件保存在src/components/Row目录下。为了测试效果设置了文字样式颜色为红色。

测试最终效果可以在项目启动后点击左侧导航的测试来看。

### 基于模块开发
始终基于模块的方式来构建你的 app，每一个子模块只做一件事情。

Vue.js 的设计初衷就是帮助开发者更好的开发界面模块。一个模块是应用程序中独立的一个部分。

#### 怎么做？

每一个 Vue 组件(等同于模块)首先必须专注于解决一个单一的问题，独立的, 可复用的, 微小的 and 可测试的。

如果你的组件做了太多的事或是变得臃肿，请将其拆分成更小的组件并保持单一的原则。一般来说，尽量保证每一个文件的代码行数不要超过 100 行。也请保证组件可独立的运行。比较好的做法是增加一个单独的 demo 示例。

### Vue 组件命名

组件的命名需遵从以下原则：

有意义的: 不过于具体，也不过于抽象
简短: 2 到 3 个单词
具有可读性: 以便于沟通交流
同时还需要注意：

必须符合自定义元素规范: 使用连字符分隔单词，切勿使用保留字。
jg- 前缀作为命名空间: 如果非常通用的话可使用一个单词来命名，这样可以方便于其它项目里复用。

#### 为什么？

组件是通过组件名来调用的。所以组件名必须简短、富有含义并且具有可读性。

#### 如何做？
```
<!-- 推荐 -->
<dic-app-header></dic-app-header>
<dic-user-list></dic-user-list>
<dic-range-slider></dic-range-slider>

<!-- 避免 -->
<btn-group></btn-group> <!-- 虽然简短但是可读性差. 使用 `button-group` 替代 -->
<ui-slider></ui-slider> <!-- ui 前缀太过于宽泛，在这里意义不明确 -->
<slider></slider> <!-- 与自定义元素规范不兼容 -->

```

#### 组件的样式
样式一律用scss写，字体大小，文字颜色,内外边距等都引用样式的全局变量。


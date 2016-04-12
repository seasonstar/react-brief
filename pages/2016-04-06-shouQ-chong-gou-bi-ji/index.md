---
title: 手Q重构笔记
date: "2016-04-06T15:02Z"
layout: post
path: "/shou-Q-chong-gou-bi-ji/"
category: "React"
description: "手Q微票重构笔记。对React，Redux及第三方库的介绍，对所用工具链的说明，还有部分学习资料的整理。"

---

### 使用框架：
- React  [入门教程](https://hulufei.gitbooks.io/react-tutorial/content/)
- Redux [学习资料](http://camsong.github.io/redux-in-chinese/index.html)
- react-router [学习资料](http://react-guide.github.io/react-router-cn/index.html)
- react-redux [连接介绍](https://leozdgao.me/reacthe-reduxde-qiao-jie-react-redux/)
- react-router-redux
帮助react-router和redux的整合，保持路由跟state或redux的store同步改变
- [redux-logger](https://github.com/fcomb/redux-logger)
redux日志中间件，在console控制台可看到输出的action数据，清晰反映业务逻辑是怎样的，如下图：
 ![Alt text](./屏幕快照 2016-04-06 下午2.46.08.png)
- [redux-thunk](https://github.com/gaearon/redux-thunk)
thunk作用是使被 dispatch 的 function 会接收 dispatch 作为参数，并且可以异步调用它

### 第三方库：
- [reqwest](https://github.com/ded/reqwest)
一个AJAX库。封装在utils/request.js里了。
- [history](https://github.com/mjackson/history)
一个管理浏览器历史的js库，配合react-router使用，方便建立hash路由。
- [store](https://github.com/nbubna/store)
一个管理浏览器localStorage和sessionStorage的库。封装在utils/cache，用于处理数据缓存。
- [js-cookie](https://github.com/js-cookie/js-cookie)
一个处理浏览器cookie的库。封装在utils/cache，用于处理数据缓存。
- [fecha](https://github.com/taylorhakes/fecha)
用于格式化和解析数据。主要用于格式化日期，封装在utils/date-parser
- [classnames](https://github.com/JedWatson/classnames)
通过js处理class名的合并，方便控制react组件的样式

### pepper简介和注意事项
[文档在此](http://gitlab.intra.wepiao.com/FEI/pepper/tree/master)，
pepper主要是用webpack, babel等组合的命令行工具，提供一些API和命令让我们可以配置项目和方便创建react组件。
如果想在本地改进pepper可以这么搞：
```bash
  git clone git@gitlab.intra.wepiao.com:FEI/pepper.git

  // cd repo dir
  cd pepper

  // link global pepper locally
  npm link
```

注意事项：有几个好用的API，在pepper.config.js配置
1.	globals: 自定义全局变量，如可定义 STATIC_API
2.	alias: 定义路径别名，添加后可在任意页面引用.如定义后'wepiao': 'components'，可
>   import  Header  from 'wepiao/Header'


### vu-开头的一系列组件简介
[项目在此](http://gitlab.intra.wepiao.com/groups/ShenzhenDev), 如Button, Icon, Tabs, Loading等。
由于修改、发布和应用这些组件比较麻烦，且暂时没有好方法修改这些通用组件的主题色，所以暂时把这些组件源代码直接移植到了重构项目里面使用，晚点再分出来。

### Vision简介和注意事项
[文档在此](http://gitlab.intra.wepiao.com/Vision/vision/tree/master)，一个react通用组件构建命令行工具。
如果要新建通用组件或者修改vu-base, vu-tabs等组件，需要安装这个工具。

### 结构
```
▸ node_modules/     省略
▾ src/
  ▾ app/
    ▸ actions/      Redux Action配置
    ▸ constants/    Redux ActionTypes 常量配置
    ▸ reducers/     Redux Reducers配置
    ▸ store/        Redux 和 router等中间件的配置
  ▸ assets/         图片、字体等资源
  ▸ components/     公用组件
  ▸ containers/     页面
  ▸ scss/           公用样式
  ▸ utils/          公用JS模块
▾ test/
  ▾ common/         ava测试
    ▾ components/
        App-test.js*
  index.html        首页模板
  mock.js           proxy URL配置
  package.json      省略
  pepper.config.js  pepper配置文件
  README.md         省略
```

### sitemap:
URL                  | Components                 |
---------------------|----------------------------|--------------
`/`                  | `App -> Home`              |首页
`/now`               | `App -> Home`              |正在热映
`/coming`            | `App -> Home`              |即将上映
`/movies/:id`        | `App -> Movie`             |电影详情
`/cinemas`           | `App -> Cinemas`           |影院列表
`/cinemas/:id`       | `App -> Cinema`            |影院详情
`/room`              | `App -> Room`              |选座
`/pay`               | `App -> Pay`               |支付
`/my`                | `App -> My`                |我的
`/welfare`           | `App -> Welfare`           |福利社

### Store 数据结构

    let Store = {
        home: {
            city: {}, // 城市信息
            now: [], // 正在热映列表
            coming: [], // 即将上映列表
        },
        movie: {
            info: {}, // 电影详情
            comments: [], // 评论列表
        },
        cinemas: {
            list: [], // 影院列表
        },
        ...
        ...
        routing: {},

    }

### 语法：ES6和ES7
里面几个语法注意点：
1. 在utils/connect.js中把connect封装成装饰器。所以在containers文件夹中的component前带有```@connect```。这个是ES7语法，跟Python的装饰器原理一样。
2. constructor 替代 ES5中的 getInitialState。
3. propTypes在ES6中写。
```javascript
export default class Header extends Component {

    // brings the propTypes inside the class definition

    static propTypes = {
        title: PropTypes.string.isRequired
    }

    render() {
        return (
            <header>
                <h1>This is the header section</h1>
            </header>
        );
    }
}
```
而在ES7中写成
```javascript
export default class Header extends Component {

    render() {
        return (
            <header>
                <h1>This is the header section</h1>
            </header>
        );
    }
}
// Note that the propTypes has to be defined outside of the class definition
Header.propTypes = {
    title: PropTypes.string.isRequired
}
```

*这些语法在通用组件代码中都有体现。*


#### 学习资料： ####

1. [React/React Native 的ES5 ES6写法对照表](http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8/2)
2. [Converting React project from ES5 to ES6](http://cheng.logdown.com/posts/2015/09/29/converting-es5-react-to-es6)


_一起学习，共同进步，欢迎补充_

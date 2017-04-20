---
title: 微信小程序+Egg打造社区全栈解决方案
date: "2017-04-19T16:50Z"
layout: post
path: "/fullstack-for-weapp-and-egg/"
category: "全栈"
description: "全栈解决方案，技术选型：后端使用Egg，Mysql，Redis，基于Nodejs开发，全套代码使用ES6编写"

---

24time 提供微信小程序社区功能全栈解决方案，配合以下项目使用:

> [egg-24time](https://github.com/seasonstar/egg-24time)

后端使用Egg，Mysql，Redis，基于Nodejs开发，全套代码使用ES6编写

> [weapp-24time](https://github.com/seasonstar/weapp-24time)

微信小程序端

> [egg-weapp-sdk](https://github.com/seasonstar/egg-weapp-sdk)

Egg的微信小程序的用户会话管理插件，小程序客户端需配合腾讯云出品的[qcloud-weapp-client-sdk](https://github.com/tencentyun/weapp-client-sdk)使用，通过Redis保存会话信息

----------------------

##### 关于Egg：

这可能是目前第一个使用阿里框架Egg开源的完整项目。

由于本人以往后端开发都是使用Python，对后端开发比较有经验。

Egg是本人接触和使用的第一款Nodejs框架，但不吹不捧，Egg出奇地好用和好学。

[Eggjs.org](https://eggjs.org)文档很完善，除了部分示例没有及时更新之外。

如果你在其他后端开发语言上有一定经验，相信你很快就能上手，你只需要按你熟悉的方式去编写代码，填入约定的目录结构。

如果你是一名后端新手，或者前端开发者，害怕遇到问题无从解决？或者Egg生态下的插件不够用？我一开始也有这个问题，但发现多虑了。

首先Egg的维护者很活跃，只要你提issue，可以随时解答你的问题。

第二，egg本身扩展性很强，并不约束你使用其他流行的Nodejs插件，你只需要按照框架约定开发你的插件即可。

第三，Egg团队目前开发维护的插件够你用了。

利用两个星期的业余时间，我完成了对Egg及其生态下各种插件，还有微信小程序的学习和开发。

##### 关于微信小程序：

也许你已经高高兴兴写好了一个小程序，别高兴太早，去微信公众平台上看看你应用所属的服务类目有没有什么限制或要求，然后经过心理痛苦挣扎，弃坑。

微信小程序的用户体验跟开发者的水平是成正比的，所以没什么好抱怨的，只是目前限制还比较多。相信微信团队会慢慢完善并开放更多功能。

微信小程序的用户会话管理是一大学问。小程序的网络请求接口wx.request()不带Cookies，这让传统基于 Cookies 实现的会话管理不再适用。

为了让处理微信小程序的服务能够识别会话，写了个插件egg的微信小程序的用户会话管理插件，需配合腾讯云开发的[qcloud-weapp-client-sdk](https://github.com/tencentyun/weapp-client-sdk)使用。

废话不多说了

具体的源码介绍和项目指南，已写在各个项目的README上。

欢迎和各位学习和交流。

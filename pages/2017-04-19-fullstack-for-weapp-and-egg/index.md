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

社区后端使用Egg，Mysql，Redis，基于Nodejs开发，全套代码使用ES6编写

> [weapp-24time](https://github.com/seasonstar/weapp-24time)

微信小程序端

> [egg-weapp-sdk](https://github.com/seasonstar/egg-weapp-sdk)

egg的微信小程序的用户会话管理插件，需配合腾讯云出品的[qcloud-weapp-client-sdk](https://github.com/tencentyun/weapp-client-sdk)使用，Redis保存会话信息



----------------------

##### 关于Egg：

这可能是目前第一个使用阿里框架Egg开源的项目。

由于以往后端开发都是使用Python，对后端开发比较有经验。

Egg是我接触和使用的第一款Nodejs框架，但不吹不捧，Egg出乎意料的好用和好学。

两个星期，我完成了对Egg及其生态下各种插件，还有微信小程序的学习和开发。

##### 关于微信小程序：

也许你已经高高兴兴写好了一个小程序，别着急，去微信公众平台上看看你应用所属的服务类目有没有什么限制或要求，然后鼓起勇气放弃这个坑。

另外，微信小程序的用户会话管理是一大学问。小程序的网络请求接口wx.request()不带Cookies，这让传统基于 Cookies 实现的会话管理不再适用。

为了让处理微信小程序的服务能够识别会话，写了个插件egg的微信小程序的用户会话管理插件，需配合腾讯云开发的[qcloud-weapp-client-sdk](https://github.com/tencentyun/weapp-client-sdk)使用

具体的源码介绍和项目指南，已写在各个项目的README上。

欢迎和各位学习和交流

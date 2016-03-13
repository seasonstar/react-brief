---
title: 解决Ubuntu下播放所有视频自动快进，无声音问题
date: "2013-04-02T15:02Z"
layout: post
path: "/jie-jue-ubuntuxia-bo-fang-suo-you-shi-pin-zi-dong-kuai-jin-wu-sheng-yin-wen-ti/"
category: "Linux"
description: "半个月前突然发现在ubuntu下播放视频没有声音，自动快进。 今天无论如何都要解决这个问题。"

---

半个月前突然发现在ubuntu下播放视频没有声音，自动快进。 今天无论如何都要解决这个问题。

google了一下，发现基本没有人遇到我这种问题。 不过看到一个类似的问题，看到一些解决办法，大概猜测出是音频驱动出了问题。

既然是音频驱动出了问题，那就重装驱动吧！

Ubuntu下主要有两种音频驱动，一种叫 ``alsa`` ,还有叫 ``pulseaudio`` 。 一开始我在终端下输入

  sudo apt-get remove alsa

然后再

  sudo apt-get install alsa

看来还没解决问题。

接着，我删除 ``pulseaudio`` 驱动，输入

  sudo apt-get remove pulseaudio

一卸载后，就马上听到电脑发出警告音了，打开视频看看，终于播放正常，有声音了！

总结，可能两个音频驱动有冲突。推荐使用 ``alsa`` 。

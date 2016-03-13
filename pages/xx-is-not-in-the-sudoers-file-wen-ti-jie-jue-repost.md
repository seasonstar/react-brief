.. title: xx is not in the sudoers file 问题解决[repost]
.. slug: xx-is-not-in-the-sudoers-file-wen-ti-jie-jue-repost
.. date: 2013/03/01 02:34:28
.. tags: Ubuntu
.. link: 
.. description: 

我用的是redhat5.4，在一般用户下执行sudo命令提示

    xing is not in the sudoers file. This incident will be reported.

解决方法：

1.  ``$whereis sudoers`` －－－－－－－找出文件所在的位置，默认都是 ``/etc/sudoers``  

2.  ``#chmod u+w /etc/sudoers`` 以超级用户登录 ``su -root`` ，修改文件权限即添加文件拥有这的写权限 限， ``ls -al /etc/sudoers`` 可以查看原文件的权限。 

3.  ``vim /etc/sudoers`` 编辑文件，在 ``root ALL=(ALL)ALL`` 行下添加 ``XXX ALL=(ALL)ALL``，XXX为你的用户名。

添加方法：找到root行，按下”i“键进入编辑模式添加即可！编辑好后esc键进入一般模式，“：wq"保存退出！ 
最后， ``#chmod u－w /etc/sudoers`` 回到文件的原权限！

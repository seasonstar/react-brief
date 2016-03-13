.. title: Ubuntu下使用mentohust上网问题
.. slug: ubuntuxia-shi-yong-mentohustshang-wang-wen-ti
.. date: 2013/03/01 00:54:55
.. tags: Ubuntu
.. link: 
.. description: 

认证时总提示“把网卡设置为自动获取IP地址” 然后把上网查找资料。操作如下： 在终端输入命令:

    sudo gedit /etc/networking/interfaces

加入下面几行代码::

    auto eth0  
    iface eth0 inet dhcp


保存，然后终端下再输入以下代码:

    sudo /etc/init.d/networking restart

如果提示 ``failed to restart network`` 的话，直接重启电脑就行了。

如果还是没法通过认证，可以参考下我的配置：

终端下输入下面命令查看:

    sudo gedit /etc/mentohust.conf

::

    [MentoHUST]
    MaxFail=8
    ;用户名，长度不超过64
    Username=20103100xxxx
    ;密码
    Password= ********
    ;网卡
    Nic=eth0
    ;静态IP用户可以使用非本机IP
    IP=192.168.1.43
    ;掩码，无关紧要
    Mask=255.255.255.0
    ;网关，如果指定了就会监视网关ARP信息
    Gateway=0.0.0.0
    ;DNS服务器，无关紧要
    DNS=0.0.0.0
    ;Ping主机，用于掉线检测，0.0.0.0表示关闭该功能
    PingHost=0.0.0.0
    ;每次发包超时时间（秒）
    Timeout=8
    ;发送Echo包的间隔（秒）
    EchoInterval=30
    ;失败等待（秒）认证失败后等待RestartWait秒或者服务器请求后重启认证
    RestartWait=15
    ;寻找服务器时的组播地址类型 0标准 1锐捷 2将MentoHUST用于赛尔认证
    StartMode=1
    ;DHCP方式 0(不使用) 1(二次认证) 2(认证后) 3(认证前)
    DhcpMode=3
    ;是否后台运行: 0(否) 1(是，关闭输出) 2(是，保留输出) 3(是，输出到文件/tmp/mentohust.log)
    DaemonMode=0
    ;是否显示通知： 0(否) 1~20(是)
    ShowNotify=5
    ;客户端版本号，如果未开启客户端校验但对版本号有要求，可以在此指定，形如3.30
    Version=3.95
    ;认证数据文件，如果需要校验客户端，就需要正确设置
    DataFile=/etc/mentohust/
    ;进行DHCP的脚本
    DhcpScript=dhclient

如果各位同学什么问题可以再联系我～



Write your post here.

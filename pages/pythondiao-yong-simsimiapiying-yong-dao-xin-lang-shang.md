.. title: Python调用simsimi api应用到新浪上
.. slug: pythondiao-yong-simsimiapiying-yong-dao-xin-lang-shang
.. date: 2013/03/01 02:48:45
.. tags: Python, SAE
.. link: 
.. description: 

参考了一个技术 `给urllib2添加自动Referer, Cookie处理功能 
<http://initiative.yo2.cn/archives/624154/>`_.
原话::

    urllib2是个非常好用的http客户端库，但是用来写爬虫可能会遇到一些问题，一是连续请求某一网站的时候，cookie需要手动添加到HTTP请求头里，二是手动处理Referer页。这里贴一段代码，可以自动处理Cookie和Referer问题。每一个请求会自动添加上一次的cookie和referer。

Python代码:

.. code:: python

    class HTTPRefererProcessor(urllib2.BaseHandler):
        def __init__(self):
            self.referer = None 

        def http_request(self, request):
            if ((self.referer is not None) and
                not request.has_header("Referer")):
                request.add_unredirected_header("Referer", self.referer)
            return request 

        def http_response(self, request, response):
            self.referer = response.geturl()
            return response 

        https_request = http_request
        https_response = http_response 

    def main():
        cj = CookieJar()
        opener = urllib2.build_opener(
            urllib2.HTTPCookieProcessor(cj),
            HTTPRefererProcessor(),
        )
        urllib2.install_opener(opener) 

        urllib2.urlopen(url1)  #打开第一个网址
        urllib2.urlopen(url2)  #打开第二个网址

    if "__main__" == __name__:
        main()

在前段时间调用simsimi接口需要用到这个思想。但现在不用了。
现在的方法很直接，就是去http://developer.simsimi.com/ 申请接口KEY
然后使用它就是了

我做了个程序用于定时评论所关注的人的新微博，还有回复评论。
不说了，我直接贴出基于Django在Baidu云平台下运行的代码:


.. code-block:: python 

    #-*- coding:utf-8 -*-
    from django.utils import simplejson
    from django.http import HttpResponse, HttpResponseRedirect
    from django.views.decorators.csrf import csrf_exempt
    from django.conf import settings
    from datetime import date, datetime
    from twentyfourtime.weibo import APIClient, APIError

    from urllib2 import HTTPError, build_opener, install_opener, HTTPCookieProcessor
    from urllib import quote, quote_plus
    from StringIO import StringIO
    from json import load
    import cookielib, urllib2
    import weibo

    APP_KEY = getattr(settings, 'APP_KEY')
    APP_SECRET = getattr(settings, 'APP_SECRET')
    CALLBACK_URL = 'http://24time.duapp.com/api/callback'

    #请到http://developer.simsimi.com/ 申请SIMSIMI_KEY
    SIMSIMI_KEY = '***********'



    class HTTPRefererProcessor(urllib2.BaseHandler):
        def __init__(self):
            self.referer = None 


        def http_request(self, request):
            if ((self.referer is not None) and
                not request.has_header("Referer")):
                request.add_unredirected_header("Referer", self.referer)
            return request 


        def http_response(self, request, response):
            self.referer = response.geturl()
            return response 


        https_request = http_request
        https_response = http_response 

    def response(request, cont=None, interface=1):
        if cont:
            url2 = 'http://api.simsimi.com/request.p?key=%s&lc=ch&ft=1.0&text=%s' % cont[14:] % SIMSIMI_KEY
            try:
                req = urllib2.Request(url2.encode('utf-8')) 
                response = urllib2.urlopen(req)  
                html = response.read()
                x = load(StringIO(html))
                if interface is 1:
                    return HttpResponse(x['response'], mimetype="application/json")
                else:
                    return x['response']
            except HTTPError, e:    
                return HttpResponse('Something wrong!', mimetype="application/json")
        else:
            return HttpResponse("你说啥？", mimetype="application/json")



    def _api():
        client = APIClient(app_key=APP_KEY, app_secret=APP_SECRET, redirect_uri=CALLBACK_URL)
        return client

    def _get_referer_url(request):
        referer_url = request.META.get('HTTP_REFERER', '/')
        host = request.META['HTTP_HOST']
        if referer_url.startswith('http') and host not in referer_url:
            referer_url = '/'
        return referer_url

    def log(request):
        client = _api()
        auth_url =client.get_authorize_url()
        #request.session['redirect_uri'] = _get_referer_url(request)
       
        return HttpResponseRedirect(auth_url)

    def log_check(request):

        verifier = request.GET.get('code', None)
        client = _api()
        r = client.request_access_token(verifier)
        access_token = r.access_token 
        expires_in = r.expires_in
        
        request.session.set_expiry(604800)
        request.session['access_token'] = access_token
        request.session['expires_in'] = expires_in

        #back_to_url = request.session['redirect_uri']
        #del request.session['redirect_uri']

        return HttpResponse(str(access_token) + str('ff')+ str(expires_in))

    def get_auth(request):
        auth = _api()
        try:
            access_token = '2.00WzGSoBmERypCb05fa68e652zullD'
            expires_in = 1359658801
        except KeyError:
            return HttpResponse("此帐号木有access_token, 请重新登录")
        auth.set_access_token(access_token, expires_in)
        return auth 

    def get_unread(request):
        api = get_auth(request)
        remind = api.remind.unread_count.get(uid=1659266414)
        unread = {}
        unread['status'] = remind['status']
        unread['comment'] = remind['cmt']
        return unread

    def get_status(request):
        api = get_auth(request)
        status = api.statuses.home_timeline.get(count=2)
        return status.statuses[0]
        #return HttpResponse(status.statuses[0])

    def get_comment(request):
        api = get_auth(request)
        comment = api.get.comments__to_me(count=2)    
        return comment.comments[0]
        #return HttpResponse(comment.comments[0].text)


    def get_update(request):
        unread = get_unread(request)
        api = get_auth(request)
        tip = "恩。。"
        if unread['status']:
            status = get_status(request)
            text = status['text']
            reply = response(request, text, interface=2)
            try:
                api.comments.create.post(id=status.id, comment=reply)
                #api.remind.set_count.post(type=status)
            except APIError:
                return HttpResponse("发评论出错", mimetype="application/json")
        else:
            tip = str(unread['status']) + tip + "没新微博"
            
        if unread['comment']:
            comment = get_comment(request)
            text = comment['text']
            reply = response(request, text, interface=2)
            try:
                api.comments.reply.post(cid=comment.id,id=comment.status.id, comment=reply)
                #api.remind.set_count.post(type=cmt)
            except APIError:
                return HttpResponse("回复评论出错", mimetype="application/json")
        else:
            tip = tip + "没新评论"
        tip = str(unread['comment']) + tip + "完成"
        return HttpResponse(tip, mimetype="application/json")

有什么问题可以一起讨论下:)

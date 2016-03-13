.. title: sinatpy的upload在sae上发送图片问题
.. slug: sinatpyde-uploadzai-saeshang-fa-song-tu-pian-wen-ti
.. date: 2013/03/01 02:02:52
.. tags: Python, SAE
.. link: 
.. description: 

这两天在研究新浪云平台上用sinatpy提供的API发送图片微博出错的问题。今天，终于搞定了，我泪流满面。

因为sae不支持本地文件读取，所以需要对上传的文件储存到sae的storage上 代码如下：

.. code-block:: python

  def handle_uploaded_file(f):
      s = sae.storage.Client()
      ob = sae.storage.Object(f.read())
      filename = f.name.decode('utf-8')
      s.put('sysusecret', filename, ob)
      return filename

然后把返回的filename传入 ``api.upload(filename,status)</code>`` 中

主要对api.py里的 ``_pack_image()`` 函数作了修改。 将827到840的如下代码注释掉。

.. code-block:: python

    """
    try:
    if os.path.getsize(filename) > (max_size * 1024):
        raise WeibopError('File is too big, must be less than 700kb.')
    #except os.error, e:
    except os.error:
        raise WeibopError('Unable to access file')

    # image must be gif, jpeg, or png
    file_type = mimetypes.guess_type(filename)
    if file_type is None:
        raise WeibopError('Could not determine file type')
    file_type = file_type[0]
    if file_type not in ['image/gif', 'image/jpeg', 'image/png']:
        raise WeibopError('Invalid file type for image: %s' % file_type)
    """

再把843行的 ``fp = open(filename, 'rb')`` 和882行的 ``fp.close`` 注释掉.

把879的 ``body.append(fp.read())`` 替换成 ``body.append(ob.data)`` 

然后在 ``_pack_image`` 函数里添加以下代码：

.. code-block:: python

    import sae.storage
    # image must be less than 700kb in size
    s = sae.storage.Client()
    ob_status = s.stat('sysusecret', filename)
    ob = s.get('sysusecret', filename)
    if ob_status['length'] > (max_size * 1024):
        raise WeibopError('File is too big, must be less than 700kb.')

    # image must be gif, jpeg, jpg, or png
    ft = ob_status['name'].rsplit('.', 1)[1]
    file_type = 'image/' + ft
    if file_type not in ['image/gif', 'image/jpeg', 'image/jpg', 'image/png']:
        raise WeibopError('Invalid file type for image: %s' % file_type)

最后差不多完成，测试发送图片，却出现错误提示:

    UnicodeDecodeError: 'ascii' codec can't decode byte 0xff in position 6: ordinal not in range(128)

尝试了下把body的各部分转换要转换成str， 在最后第几行的

    body = 'rn'.join(body)

前面加上一句

    body = [str(seg) for seg in body]

保存。测试，终于发送图片成功了。



# LeanCloud-Express

提供 [LeanCloud](https://leancloud.cn/?source=AP8Q8DNT) 存取数据和微信 JSSDK 基本功能，基于 Express(Node.js)。功能包括：

- 从 LeanCloud 请求数据;
- Post 数据到 LeanCloud;
- 分别配置 dev 和 production 信息;
- 微信 JSSDK 签名生成，以及整个 wx.config 方法;
- 预览微信 JSSDK 上传的图片;
- 把微信 JSSDK 图片转存到 LeanCloud。

## 使用方法

1. git clone git@github.com:leplay/leancloud-wechat.git
2. cd leancloud-wechat && npm install
3. 设置 config/default.json
4. DEBUG=leancloud-wechat:\* npm start

打开 http://localhost:3000/ 开始调试。

## Tips

- 想要在手机微信里调试页面，可以在微信公众号后台将安全域名设置为内网地址，例如 192.168.31.137:3000，然后手机端即可访问；
- 前端页面可以使用[微信上传下载多媒体文件](http://mp.weixin.qq.com/wiki/12/58bfcfabbd501c7cd77c19bd9cfa8354.html)接口在本地预览图片，但上传到服务器端时只需传 mediaId，然后服务端重新获取 access_token 拼接出 url。传本地预览的 url 的话，可能会导致 access_token 不是最新的而读取失败；
- npm run prod 可启动 production 环境，需要先安装 [forever](https://github.com/foreverjs/forever) ；
- 微信图片上传接口对公众号无限制，但是！微信上传下载多媒体文件需要进行微信认证。


## LeanCloud 注册请点[这里](https://leancloud.cn/?source=AP8Q8DNT)


var express = require('express');
var router = express.Router();
var wechat = require('../utils/wechat');
var co = require('co');
var config = require('config');
var appId = config.get('wechat.appId');

/* GET home page. */
router.get('/', function(req, res, next) {
  // if (!/micromessenger/.test(req.headers['user-agent'].toLowerCase())) {
  //   res.send('请使用微信打开 😂');
  // } else {
    co(function*() {
      var token = yield wechat.getToken();
      var ticket = yield wechat.getTicket(token.access_token);
      var sign = yield wechat.sign(ticket.ticket, config.get('wechat.domain') + req.originalUrl);
      sign.appId = appId;
      res.render('index', { wechat: sign, access_token: token.access_token });
    });
  // }
});

module.exports = router;

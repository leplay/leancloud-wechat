var express = require('express');
var router = express.Router();
var async = require('async');
var AV = require('../utils/leancloud');
var request = require('request');
var TestObject = AV.Object.extend('Test');
var wechat = require('../utils/wechat');
var co = require('co');


router.post('/uploadWechatPicture', function(req, res, next) {
  var form = req.body;
  console.log(form);
  co(function*() {
    var token = yield wechat.getToken();
    var access_token = token.access_token;
    var pictureUrl = 'http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + form.mediaId;
    async.waterfall([
      function(callback) {
        request({
          url: pictureUrl,
          encoding: null
        }, function(err, res, body) {
          callback(null, body);
        });
      },
      function(image, callback) {
        var testObject = new TestObject();

        var file = new AV.File(form.name + '.jpg', new Buffer(image));
        file.save().then(function(file) {
          testObject.set('picture', file.url());
          testObject.set('name', form.name);
          testObject.set('mediaId', form.mediaId);
          testObject.set('somethingElse', form.somethingElse);
          testObject.save().then(function(resp) {
            callback(null, {})
          }, function(error) {
            callback(error);
          });
        }, function(error) {
          callback(error);
        });;
      }
    ], function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    });
  });
});

router.post('/save', function(req, res, next) {
  var form = req.body;
  console.log(form);
  async.series([
    function() {
      var testObject = new TestObject();
      testObject.set('name', form.name);
      testObject.set('somethingElse', form.somethingElse);
      testObject.save().then(function(resp) {
        res.json(resp);
      }, function(error) {
        console.log(error);
        res.sendStatus(500);

      });
    }
  ]);
});


router.get('/latest', function(req, res, next) {
  async.series([
    function() {
      var query = new AV.Query('Test');
      query.descending('createdAt');
      query.first().then(function(resp) {
        res.json(resp);
      }, function(error) {
        console.log(error);
        res.sendStatus(500);
      });
    }
  ]);
});


router.get('/list', function(req, res, next) {
  var page = req.params.page || 0;
  async.series([
    function() {
      var query = new AV.Query('Test');
      query.exists('picture');
      query.descending('createdAt');
      query.limit(20);
      // query.skip(20*page);
      query.find().then(function(resp) {
        res.json(resp);
      }, function(error) {
        console.log(error);
        res.sendStatus(500);
      });
    }
  ]);
});
router.get('/all', function(req, res, next) {
  async.series([
    function() {
      var query = new AV.Query('Test');
      query.descending('createdAt');
      query.limit(1000);
      query.find().then(function(resp) {
        res.json(resp);
      }, function(error) {
        console.log(error);
        res.sendStatus(500);
      });
    }
  ]);
});

module.exports = router;

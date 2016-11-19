var AV = require('leanengine');
var config = require('config');
AV.init({appId: config.get('leancloud.appId'), appKey: config.get('leancloud.appKey'), masterKey: config.get('leancloud.masterKey')});
AV.Cloud.useMasterKey();

module.exports = AV;

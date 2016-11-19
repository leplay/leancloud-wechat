var mediaId;

var getJSON = function(url, successHandler, errorHandler) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.responseType = 'json';
  xhr.onreadystatechange = function() {
    var status;
    if (xhr.readyState == 4) {
      status = xhr.status;
      if (status == 200) {
        successHandler && successHandler(xhr.response);
      } else {
        errorHandler && errorHandler(status);
      }
    }
  };
  xhr.send();
};

var postRequest = function(url, data, successHandler, errorHandler) {
  var xhr = new XMLHttpRequest();
  var params = JSON.stringify(data);
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    var status;
    if (xhr.readyState == 4) {
      status = xhr.status;
      if (status == 200) {
        var data = JSON.parse(xhr.responseText);
        successHandler && successHandler(data);
      } else {
        errorHandler && errorHandler(status);
      }
    }
  }
  xhr.send(params);
};





document.getElementById('getRequest').onclick = function() {
  getJSON('/api/latest', function(resp) {
    console.log(resp);
  }, function(status) {
    console.log(status);
  });
};

document.getElementById('postRequest').onclick = function() {
    var data = {
      name: 'leplay',
      somethingElse: 'whatever'
    };
    postRequest('/api/save', data, function(resp) {
      console.log(resp);
    }, function(status) {
      console.log(status);
    });
};


wx.ready(function() {
  document.getElementById('chooseImage').onclick = function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: function (imageRes) {
        wx.uploadImage({
          localId: imageRes.localIds[0],
          success: function (uploadRes) {
            mediaId = uploadRes.serverId;
            // 预览图片
            var picture = 'http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=' + access_token + '&media_id=' + mediaId;
            document.getElementById('preview').setAttribute('src', picture);
          },
          fail: function (err) {
            console.log(JSON.stringify(err));
          }
        });
      }
    });
  };

  document.getElementById('uploadImage').onclick = function () {
    var data = {
      name: 'leplay',
      mediaId: mediaId,
      somethingElse: 'whatever'
    };
    postRequest('/api/uploadWechatPicture', data, function(resp) {
      // 传 mediaId 不要传预览图片的 url，否则会出现服务器访问图片时 access_token 不是最新的而报错。
      alert(resp);
    }, function(status) {
      alert(status);
    });
  };

  wx.onMenuShareAppMessage({
      title: '', // 分享标题
      desc: '', // 分享描述
      link: '', // 分享链接
      imgUrl: '', // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () { 
          // 用户确认分享后执行的回调函数
      },
      cancel: function () { 
          // 用户取消分享后执行的回调函数
      }
  });

  wx.onMenuShareTimeline({
      title: '', // 分享标题
      link: '', // 分享链接
      imgUrl: '', // 分享图标
      success: function () { 
          // 用户确认分享后执行的回调函数
      },
      cancel: function () { 
          // 用户取消分享后执行的回调函数
      }
  });

});

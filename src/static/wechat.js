var request = require('request')

module.exports = function(app) {
  app.get('/wechat/info/:code', function(req, res, next) {
    var type = 'authorization_code',
      appId = 'wx6e8a3e1b87c11294',
      appSecret = 'ddef514562b549b5833fb210ecadefab',
      url = 'https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=' + type + '&appid=' + appId + '&secret=' + appSecret + '&code=' + req.params.code

    request({
      followAllRedirects: true,
      url: url
    }, function (error, response, body) {
      if (!error) {
        var json = JSON.parse(body)

        if (json.errcode) {
          res.status(500).send({message: json.errmsg})
        } else if (json.access_token && json.openid) {
          getUserInfo(res, json.access_token, json.openid)
        } else {
          res.status(500).send()
        }
      }
    })
  })
}

function getUserInfo(res, token, openid) {
  var url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + token + '&openid=' + openid

  request({
    followAllRedirects: true,
    url: url
  }, function (error, response, body) {
    if (!error) {
      var user = {},
        json = JSON.parse(body)

      user.handle = json.nickname,
      user.openid = json.openid,
      user.gender = (json.sex === 1) ? 1 : 0,
      user.language = json.language,
      user.city = json.city,
      user.province = json.province,
      user.country = json.country,
      user.avatar = json.headimgurl
      
      res.status(200).send(user)
    }
  })
}
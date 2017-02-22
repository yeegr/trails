const request = require('request')

module.exports = (app) => {
  app.get('/wechat/info/:code', (req, res, next) => {
    let type = 'authorization_code',
      appId = 'wx6e8a3e1b87c11294',
      appSecret = 'ddef514562b549b5833fb210ecadefab',
      url = 'https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=' + type + '&appid=' + appId + '&secret=' + appSecret + '&code=' + req.params.code

    request({
      followAllRedirects: true,
      url
    }, (error, response, body) => {
      if (!error) {
        let json = JSON.parse(body)

        if (json.errcode) {
          res.status(500).json({error: json.errmsg})
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
  let url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + token + '&openid=' + openid

console.log('user info url: ', url)
  request({
    followAllRedirects: true,
    url
  }, function (error, response, body) {
    if (!error) {
      let user = {},
        json = JSON.parse(body)

      user.handle = json.nickname,
      user.wechat = json.openid,
      user.gender = (json.sex === 1) ? 1 : 0,
      user.language = json.language,
      user.city = json.city,
      user.province = json.province,
      user.country = json.country,
      user.avatar = json.headimgurl
      
      console.log(user)
      res.status(200).send(user)
    }
  })
}
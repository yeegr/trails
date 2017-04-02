'use strict'

const request = require('request'),
  wechat = {
		"appid": "wx08727837cbbd7bdc",
		"appSecret": "3245de333ae759dc192a3aaa31061db3",
		"mch_id": "1452752702"
	}

module.exports = (app) => {
	app.get('/wx', (req, res, next) => {
		let shasum = crypto.createHash('sha1'),
			query = req.query,
			token = "BidqDpyeoFWfV4cMN7am7iclpjMPnGb5",
			list = [token, query.timestamp, query.nonce]

		list.sort()

		let tmp = list.join('')
		shasum.update(tmp)

		let sign = shasum.digest('hex'),
			result = (sign === query.signature) ? query.echostr : ''

		res.status(200).send(result)
	})

	app.get('/wx/auth', (req, res, next) => {
		let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?'

		url += 'appid=' + wechat.appid
		url += '&secret=' + wechat.appSecret
		url += '&code=' + req.query.code
		url += '&grant_type=authorization_code'

		request(url, (error, response, body) => {
			res.status(200).json(JSON.parse(body))
		})
	})
}

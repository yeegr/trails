const express = require('express'),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  bodyParser = require('body-parser'),
  formidable = require('formidable'),
  fs = require('fs'),
  cors = require('cors'),
  path = require('path'),
  url = require('url'),
  http = require('http'),
  sharp = require('sharp'),
  TopClient = require('./sdks/taobao/topClient').TopClient,
  port = 8000,
  app = express(),
  router = express.Router()

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
  app.use(errorHandler())
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(cors())

const avatar = require('./avatar')(app),
  wechat = require('./sdks/wechat/info')(app),
  f6ot = require('./sdks/f6ot/curl')(app)

router.use(function(req, res, next) {
  next()
})

router.get('/', function(req, res, next) {
  let os = req.query.os,
    screen = req.query.res.split('x'),
    type = req.query.type,
    path = req.query.path,
    server = 'http://uploads:80/',
    url = server + path,
    screenWidth = parseInt(screen[0]),
    screenHeight = parseInt(screen[1]),
    width = 100,
    height = 100,
    margin = 0

  switch (screenWidth) {
    case 640:
      margin = 12
    break

    case 720:
      margin = 16
    break

    case 750:
      margin = 20
    break

    case 1080:
      margin = 30
    break
  }

  switch (type) {
    case 'background':
      width = screenWidth
      height = null
    break

    case 'hero':
      width = screenWidth
      height = Math.floor(width * 2 / 3)
    break

    case 'gear':
      width = Math.floor((screenWidth - 6 * margin) / 5)
      height = width
    break

    case 'avatar':
      width = Math.round(screenWidth / 3)
      height = width
    break

    case 'thumb':
      width = Math.floor((screenWidth - 5 * margin) / 4)
      height = width
    break
  }

  let transformer = scale(width, height)

  http.get(url, function(result) {
    if (result.statusCode === 200) {
      console.log(result.headers['content-type'])
      res
      .type(result.headers['content-type'])
      .set({'Cache-Control': 'public, max-age=31557600'})
      //.set({'Expires': Date.now() + 2678400})
      .status(result.statusCode)

      result.pipe(transformer).pipe(res)
    }
  })
})

let scale = function(width, height) {
  return sharp()
    .resize(width, height)
    .withoutEnlargement()
}

router.post('/up', function(req, res, next) {
  let form = new formidable.IncomingForm()

  form.parse(req, function(err, fields, files) {
    if (err) throw err

    let dir = 'uploads/' + fields.path
    console.log('dir: ', dir)

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    let file = files.file,
      inputStream = fs.createReadStream(file.path),
      outputStream = fs.createWriteStream(dir + file.name)

    inputStream.pipe(outputStream)
    outputStream.on('finish', () => {
      fs.unlinkSync(file.path)
      res.status(201).send()
    })
  })
})

// 阿里大于 SMS verification
// =============================================================================
const smsClient = new TopClient({
    'appkey'   : '23493240',
    'appsecret': 'fcab6c93a5ce6cb54bd16892e804da8a',
    'REST_URL' : 'http://gw.api.taobao.com/router/rest'
  }),
  smsUri = 'alibaba.aliqin.fc.sms.num.send'

router.post('/validate', function(req, res, next) {
  let body = req.body,
    template = 'SMS_22520124'

  switch (body.action) {
    // 登录或注册
    case 'login':
      template = 'SMS_22520124'
    break

    // 活动确认
    case 'signup':
      template = 'SMS_22520121'
    break
  }

  smsClient.execute(smsUri, {
     'extend'             :'' ,
     'sms_type'           : 'normal',
     'sms_free_sign_name' : '识途驴',
     'sms_param'          : '{"code":"' + body.vcode + '","product":"识途驴"}',
     'rec_num'            : body.mobile.toString(),
     'sms_template_code'  : template
  }, function(error, response) {
    //if (error) throw error
    
    let result = response.result

    if (result.err_code !== '0') {
      let message='',
        solution=''

      switch (result.sub_code) {
        case 'isv.OUT_OF_SERVICE':
          message='业务停机'
          solution='登陆www.alidayu.com充值'
        break

        case 'isv.PRODUCT_UNSUBSCRIBE':
          message='产品服务未开通'
          solution='登陆www.alidayu.com开通相应的产品服务'
        break

        case 'isv.ACCOUNT_NOT_EXISTS':
          message='账户信息不存在'
          solution='登陆www.alidayu.com完成入驻'
        break

        case 'isv.ACCOUNT_ABNORMAL':
          message='账户信息异常'
          solution='联系技术支持'
        break

        case 'isv.SMS_TEMPLATE_ILLEGAL':
          message='模板不合法'
          solution='登陆www.alidayu.com查询审核通过短信模板使用'
        break

        case 'isv.SMS_SIGNATURE_ILLEGAL':
          message='签名不合法'
          solution='登陆www.alidayu.com查询审核通过的签名使用'
        break

        case 'isv.MOBILE_NUMBER_ILLEGAL':
          message='手机号码格式错误'
          solution='使用合法的手机号码'
        break

        case 'isv.MOBILE_COUNT_OVER_LIMIT':
          message='手机号码数量超过限制'
          solution='批量发送，手机号码以英文逗号分隔，不超过200个号码'
        break

        case 'isv.TEMPLATE_MISSING_PARAMETERS':
          message='短信模板变量缺少参数'
          solution='确认短信模板中变量个数，变量名，检查传参是否遗漏'
        break

        case 'isv.INVALID_PARAMETERS':
          message='参数异常'
          solution='检查参数是否合法'
        break

        case 'isv.BUSINESS_LIMIT_CONTROL':
          message='触发业务流控限制'
          solution='短信验证码，使用同一个签名，对同一个手机号码发送短信验证码，允许每分钟1条，累计每小时7条。 短信通知，使用同一签名、同一模板，对同一手机号发送短信通知，允许每天50条（自然日）。'
        break

        case 'isv.INVALID_JSON_PARAM':
          message='JSON参数不合法'
          solution='JSON参数接受字符串值。例如{"code":"123456"}，不接收{"code":123456}'
        break

        case 'isp.SYSTEM_ERROR':
        break

        case 'isv.BLACK_KEY_CONTROL_LIMIT':
          message='模板变量中存在黑名单关键字。如：阿里大鱼'
          solution='黑名单关键字禁止在模板变量中使用，若业务确实需要使用，建议将关键字放到模板中，进行审核。'
        break

        case 'isv.PARAM_NOT_SUPPORT_URL':
          message='不支持url为变量'
          solution='域名和ip请固化到模板申请中'
        break

        case 'isv.PARAM_LENGTH_LIMIT':
          message='变量长度受限'
          solution='变量长度受限 请尽量固化变量中固定部分'
        break

        case 'isv.AMOUNT_NOT_ENOUGH':
          message='余额不足'
          solution='因余额不足未能发送成功，请登录管理中心充值后重新发送'
        break
      }

      console.logs(Date.now(), result.code, result.sub_code, result.sub_msg, solution)

      res.status(500).send()
    }

    res.status(200).send()
  })
})

// REGISTER ROUTES
// =============================================================================
app.use('/', router)

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('Environmental variables: ', process.env)
console.log('Graphics server running on port ' + port)

var express = require('express'),
  logger = require('morgan'),
  errorHandler = require('errorhandler'),
  bodyParser = require('body-parser'),
  formidable = require('formidable'),
  fs = require('fs'),
  path = require('path'),
  cors = require('cors'),
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

router.use(function(req, res, next) {
  next()
})

var avatar = require('./avatar')(app),
  wechat = require('./sdks/wechat/info')(app),
  f6ot = require('./sdks/f6ot/curl')(app)

router.get('/', function(req, res, next) {
  var os = req.query.os,
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

  var transformer = scale(width, height)

  http.get(url, function(result) {
    if (result.statusCode === 200) {
      res.type(result.headers['content-type']).set({'Cache-Control': 'public, max-age=31557600'}).status(result.statusCode)
      result.pipe(transformer).pipe(res)
    }
  })
})

var scale = function(width, height) {
  return sharp()
    .resize(width, height)
    .withoutEnlargement()
}

router.post('/up', function(req, res, next) {
  var form = new formidable.IncomingForm()

  form.parse(req, function(err, fields, files) {
    if (err) {
      throw err
    }

    var dir = 'uploads/' + fields.path

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    var file = files.file,
      inputStream = fs.createReadStream(file.path),
      outputStream = fs.createWriteStream(dir + file.name)

    inputStream.pipe(outputStream)
    outputStream.on('finish', () => {
      fs.unlinkSync(file.path)
      res.status(201).send()
    })
  })
})

// 阿里大于 SMS validation
// =============================================================================
var smsClient = new TopClient({
    'appkey'   : '23493240',
    'appsecret': 'fcab6c93a5ce6cb54bd16892e804da8a',
    'REST_URL' : 'http://gw.api.taobao.com/router/rest'
  }),
  smsUri = 'alibaba.aliqin.fc.sms.num.send'

router.post('/validate', function(req, res, next) {
  var body = req.body,
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
    if (error) {
      throw error
    } 
    
    if (response.result.err_code !== '0') {
      console.error(response.result.err_message)
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
console.log('Graphics server running on port ' + port)

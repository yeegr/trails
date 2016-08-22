var express = require('express'),
	logger = require('morgan'),
	errorHandler = require('errorhandler'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  url = require('url'),
  http = require('http'),
  sharp = require('sharp'),
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

var curl = require('./curl')(app)

router.get('/', function(req, res, next) {
  var os = req.query.os,
    screen = req.query.res.split('x'),
    type = req.query.type,
    path = req.query.path,
    server = 'http://192.168.0.102:8080/',
    url = server + path,
    screenWidth = parseInt(screen[0]),
    screenHeight = parseInt(screen[1]),
    width = 100,
    height = 100,
    margin = 0

  switch (screenWidth) {
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
      height = width * 2 / 3
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
      res.type(result.headers['content-type']).status(result.statusCode)
      result.pipe(transformer).pipe(res)
    }
  })
})

var scale = function(width, height) {
  return sharp()
    .resize(width, height)
    .withoutEnlargement()
}





// REGISTER ROUTES
// =============================================================================
app.use('/', router)

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('Static server on port ' + port)

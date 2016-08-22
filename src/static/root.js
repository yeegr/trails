var express = require('express'),
	logger = require('morgan'),
	errorHandler = require('errorhandler'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  url = require('url'),
  http = require('http'),
  sharp = require('sharp'),
  request = require('request'),
  jsdom = require('jsdom'),
  $ = require('jquery')(require("jsdom").jsdom().defaultView),
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


router.get('/curl', function(req, res, next) {
  getTrailInfo(res, req.query.id)
})

function getTrailInfo(res, id) {
  var url = 'http://www.foooooot.com/trip/' + id

  request({
    followAllRedirects: true,
    url: url
  }, function (error, response, body) {
    if (!error) {
      var dom = $(body),
      title = dom.find('h1.title').get(0).innerHTML.trim(),
      desc = dom.find('div.trip_box_description').get(0).innerHTML.trim(),
      desc = (desc.length < 3) ? '' : desc,
      type = dom.find('dl.trip_box_right dd:nth-child(3) a').get(0).innerHTML.trim(),
      data = dom.find('dl.trip_box_right dd:nth-child(4)').get(0).innerHTML.trim(),
      level = data.substring(data.lastIndexOf('>') + 1).trim(),
      trailType = 0,
      difficulty = 1

      switch (type) {
        case '徒步':
          trailType = 0
        break

        case '跑步':
          trailType = 2
        break

        case '登山':
          trailType = 3
        break

        case '骑行':
        case '公路骑行':
          trailType = 5
        break

        case '山地骑行':
          trailType = 6
        break

        case '滑板':
          trailType = 8
        break

        case '滑雪':
          trailType = 20
        break

        case '航海':
          trailType = 49
        break

        case '滑翔伞':
          trailType = 61
        break

        case '摩托车':
          trailType = 80
        break

        case '自驾车':
          trailType = 81
        break

        case '寻宝':
          trailType = 111
        break

        case '观光旅游':
        case '摄影':
          trailType = 110
        break
      }

      switch (level) {
        case '简单':
          difficulty = 1
        break

        case '一般':
          difficulty = 2
        break

        case '难':
          difficulty = 3
        break

        case '非常难':
          difficulty = 4
        break

        case '专家级':
          difficulty = 5
        break
      }

      getTrailPoints(res, {
        url,
        id,
        title,
        desc,
        type: trailType,
        difficulty
      })
    }
  })
}

function getTrailPoints(res, info) {
  var url = info.url + '/offsettrackjson/'

  request({
    followAllRedirects: true,
    url: url
  }, function (error, response, body) {
    if (!error) {
      var tmp = body.replace(/\"|\s/g, ''),
      points = JSON.parse(tmp),
      data = calculateTrailData(points),
      trail = {
        title: info.title,
        description: info.desc,
        type: info.type,
        difficultyLevel: info.difficulty,
        totalDistance: data.totalDistance,
        totalDuration: data.totalDuration,
        totalElevation: data.totalElevation,
        maximumAltitude: data.maximumAltitude,
        averageSpeed: data.averageSpeed,
        points: points
      }

      res.status(200).send(JSON.stringify(trail))
    }
  })
}

function calculateTrailData(points) {
  const firstPoint = points[0],
    lastPoint = points[points.length - 1],
    totalDuration = lastPoint[0] - firstPoint[0],
    totalDistance = parseFloat(lastPoint[5].toFixed(3))

  let elevationArray = [], 
    totalSpeed = 0

  points.map((point) => {
    elevationArray.push(point[3])
    totalSpeed += point[4] * 10
  })

  const maximumAltitude = Math.max(...elevationArray),
    minimumAltitude = Math.min(...elevationArray),
    averageSpeed = Math.round(totalSpeed / points.length) / 10

  return {
    date: firstPoint[0],
    totalDuration,
    totalDistance,
    totalElevation: Math.round(maximumAltitude - minimumAltitude),
    maximumAltitude,
    averageSpeed
  }
}


// REGISTER ROUTES
// =============================================================================
app.use('/', router)

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('Static server on port ' + port)

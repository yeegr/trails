var request = require('request'),
    $ = require('jquery')(require("jsdom").jsdom().defaultView)

module.exports = function(app) {
  app.get('/curl', function(req, res, next) {
    getTrailInfo(res, req.query.id, req.query.area)
  })
}

function getTrailInfo(res, id, area) {
  var url = 'http://www.foooooot.com/trip/' + id

  request({
    followAllRedirects: true,
    url: url
  }, function (error, response, body) {
    if (!error) {
      var dom = $(body),
      title = dom.find('h1.title').get(0).innerHTML.trim(),
      desc = dom.find('div.trip_box_description').get(0).innerHTML.replace(/<(?:.|\n)*?>/gm, '').replace(/\&nbsp\;/gi, '').replace(/\n/gi, '').trim(),
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
        area,
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
        creator: '57b91b676df29171025b9e14',
        areas: [info.area],
        title: info.title,
        description: info.desc,
        type: info.type,
        difficultyLevel: info.difficulty * 2,
        averageSpeed: data.averageSpeed,
        points: points,
//        totalDistance: data.totalDistance,
//        totalDuration: data.totalDuration,
//        totalElevation: data.totalElevation,
//        maximumAltitude: data.maximumAltitude
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
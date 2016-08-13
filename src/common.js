'use strict'

import moment from 'moment'
import 'moment-duration-format'
import 'moment/locale/zh-cn'

const locale = 'zh-cn'
var hrs = (locale === 'zh-cn') ? '小时' : 'hrs',
    min = (locale === 'zh-cn') ? '分钟' : 'min'

// format time
export function getTimeFromId(id) {
  let timestamp = id.toString().substring(0, 8)
  return moment(parseInt(timestamp, 16) * 1000)
}

export function formatMinutes(minutes) {
  if (isNumeric(minutes)) {
    let h = Math.floor(minutes / 60),
      m = minutes % 60
    return zerorize(h) + ':' + zerorize(m)
  }
}

export function convertTime(seconds) {
  return moment(isNumeric(seconds) ? (seconds * 1000) : dt)
}

export function formatTime(dt) {
  var fmt = arguments[1] ? arguments[1] : 'll'
  return convertTime(dt).locale(locale).format(fmt)
}

export function formatEndTime(dt, days) {
  var fmt = arguments[2] ? arguments[2] : 'll'
  return convertTime(dt).add(days, 'days').locale(locale).format(fmt)
}

export function formatEventGroupLabel(event, groupIndex) {
  const startDate = moment(event.groups[groupIndex].startDate),
    days = event.schedule.length

  return startDate.format('LL') + '-' + moment(startDate).add(days, 'days').format('LL')
} 

export function formatDateSpan(startDate, days) {
  const start = moment(startDate)

  return start.format('LL') + '-' + moment(start).add(days, 'days').format('LL')
} 

export function formatFromNow(timestamp) {
  return Moment(timestamp * 1000).locale(locale).fromNow()
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export function zerorize(n) {
  return (n < 10) ? '0' + n.toString() : n.toString()
}

// format trail data
export function calculateTrailData(points) {
  const firstPoint = points[0],
    lastPoint = points[points.length - 1],
    totalDuration = lastPoint[0] - firstPoint[0],
    totalDistance = lastPoint[4]

  let elevationArray = [], 
    totalSpeed = 0

  points.map((point) => {
    elevationArray.push(point[3])
    totalSpeed += point[5]
  })

  const maximumAltitude = Math.max(...elevationArray),
    minimumAltitude = Math.min(...elevationArray)

  return {
    date: firstPoint[0],
    totalDuration,
    totalDistance,
    totalElevation: maximumAltitude - minimumAltitude,
    maximumAltitude,
    averageSpeed: Math.round(totalSpeed / points.length * 10) / 10
  }
}

export function formatDuration(seconds) {
  if (isNumeric(seconds)) {
    let fmt = (arguments[1]) ? arguments[1] : 'h[' + hrs + ']m[' + min + ']'
    return moment.duration({'seconds': seconds}).format(fmt)
  }
}

export function formatTrailChartData(points) {
  const step = Math.floor(points.length / 8)

  let arr = [], startTime = points[0][0]

  points.map((point, index) => {
    if (index % step === 0) {
      arr.push([formatDuration((point[0] - startTime), 'h:mm'), point[3]])
    }
  })

  return arr
}

export function formatTrailPoints(points) {
  var path = points.map(function(arr, index) {
      return {
        latitude: arr[1],
        longitude: arr[2]
      }
    })
  return path
}

export function getMapCenter(points) {
  var totalLat = 0,
    totalLng = 0,
    latArr = [],
    lngArr = []

  points.map(function(arr, index) {
    var lat = parseFloat(arr[1]),
      lng = parseFloat(arr[2])

    totalLat += lat,
    totalLng += lng,
    latArr.push(lat),
    lngArr.push(lng)
  })

  var latDelta = Math.max(...latArr) - Math.min(...latArr),
    lngDelta = Math.max(...lngArr) - Math.min(...lngArr)

  return {
    latitude: totalLat / points.length,
    longitude: totalLng / points.length,
    latitudeDelta: latDelta * 1.2,
    longitudeDelta: lngDelta * 1.2
  }
}

const earthRadiusInKm = 6371

function rad2deg(radians) {
  return radians * 180 / Math.PI
}

function deg2rad(degrees) {
  return degrees * Math.PI / 180
}

function getLatitudeDelta(latitude) {
  let radiusInKm = arguments[1] || 3
  return rad2deg(radiusInKm / earthRadiusInKm / Math.cos(deg2rad(latitude)))
}

export function setRegion(point, aspect_ratio) {
  let latitudeDelta = getLatitudeDelta(point.latitude),
    longitudeDelta = latitudeDelta * aspect_ratio

  return {
    latitude: point.latitude,
    longitude: point.longitude,
    altitude: point.altitude,
    latitudeDelta,
    longitudeDelta
  }
}

export function showTrailDifficulty(level) {
  return (level / 2).toString()
}

// detail information
export function phoneLink(phoneNumber) {
  return "tel:" + phoneNumber
}

 export function createMarkup(html) {
  return {
    __html: html
  }
}

export function hex2rgb(hex) {
  if (hex.indexOf('rgb') === 0) {
    return hex
  }
  
  var hex = (hex.indexOf('#') === 0) ? hex.substring(1) : hex,
    arr = hex.split(''),
    str = []

  if (arr.length > 3) {
    str[0] = arr[0] + arr[1],
    str[1] = arr[2] + arr[3],
    str[2] = arr[4] + arr[5]
  } else {
    str[0] = arr[0],
    str[1] = arr[1],
    str[2] = arr[2]
  }
  
  var r = parseInt(str[0], 16).toString(),
    g = parseInt(str[1], 16).toString(),
    b = parseInt(str[2], 16).toString(),
    color = (arguments[1] && parseFloat(arguments[1]) < 1) ? 'rgba(' + r + ',' + g + ',' + b + ',' + arguments[1] + ')' : 'rgb(' + r + ',' + g + ',' + b + ')'
  
  return color
}

// alt functions
const charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function generateRandomString(length) {
  let txt = ''

  for (let i = 0; i < length; i++) {
    txt += charList.charAt(Math.floor(Math.random() * charList.length))
  }

  return txt
}

// insurance
export function calculateInsurance(event, user) {
  const eventDurationArray = [0.001, 0.0018, 0.0021, 0.003],
    eventDifficultyArray = [1,2,3,4,5,6,7,8,9,10],
    eventAttendeeCountArray = [1, 1.5, 2], 
    userLevelArray = [3.6, 2.3, 1.6, 1.2, 0.9]

  let eventDurationIndex, 
    eventAttendeeCountIndex,
    eventDurationCoefficient,
    eventDifficultyCoefficient,
    eventAttendeeCountCoefficient

  let base = event.expenses.perHead, 
    difficultyList = [], 
    eventDifficultyIndex = 1, 
    eventDuration = event.schedule.length, 
    userLevelCoefficient = userLevelArray[user.level]

  if (eventDuration < 2) {
    eventDurationIndex = 0
  } else if (eventDuration > 1 && eventDuration < 6) {
    eventDurationIndex = 1
  } else if (eventDuration > 5 && eventDuration < 10) {
    eventDurationIndex = 2
  } else {
    eventDurationIndex = 3
  }

  eventDurationCoefficient = eventDurationArray[eventDurationIndex]

  event.schedule.map((day) => {
    day.map((agenda, index) => {
      if (agenda.type < 20) {
        difficultyList.push(agenda.difficultyLevel)
      }
    })
  })

  eventDifficultyCoefficient = Math.max(...difficultyList)
  eventDifficultyCoefficient = isNumeric(eventDifficultyCoefficient) ? eventDifficultyCoefficient : 1

  if (event.maxAttendee > 29) {
    eventAttendeeCountIndex = 2
  } else if (event.maxAttendee < 2) {
    eventAttendeeCountIndex = 0
  } else {
    eventAttendeeCountIndex = 1
  }

  eventAttendeeCountCoefficient = eventAttendeeCountArray[eventAttendeeCountIndex]

  let coef = 1 + (eventDifficultyCoefficient * eventDurationCoefficient * eventAttendeeCountCoefficient * userLevelCoefficient)

  return (Math.round(base * coef * 100) / 100)
}

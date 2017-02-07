'use strict'

import moment from 'moment'
import 'moment-duration-format'
import 'moment/locale/zh-cn'

import {DEFAULT_LOCALE} from './constants'

const locale = DEFAULT_LOCALE.toLowerCase()

let hrs = (locale === 'zh-cn') ? '小时' : 'hrs',
    min = (locale === 'zh-cn') ? '分钟' : 'min'



// base functions
export function isNullOrUndefined(obj) {
  return obj === null || obj === undefined
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export function zerorize(n) {
  return (n < 10) ? '0' + n.toString() : n.toString()
}

// deep merge
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

export function mergeDeep(target, source) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

// convert kv object to array
export function obj2arr(obj) {
  let arr = []

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(obj[key])
    }
  }

  return arr
}

export function getEventHeroPath(data) {
  let hero = data.hero

  if (hero.indexOf('/') === 0) {
    return hero
  } else {
    let path = (hero.indexOf('default') > -1) ? '' : data._id + '/'
    return 'events/' + path + hero
  }
}

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

export function formatSeconds(seconds) {
  if (isNumeric(seconds)) {
    let m = Math.floor(seconds / 60),
      s = seconds % 60

    return (m > 59 ? formatMinutes(m) : zerorize(m)) + ':' + zerorize(s)
  }
}

export function convertTime(seconds) {
  return moment(isNumeric(seconds) ? (seconds * 1000) : seconds)
}

export function formatTime(dt) {
  let fmt = arguments[1] ? arguments[1] : 'll'
  return convertTime(dt).locale(locale).format(fmt)
}

export function formatEndTime(dt, days) {
  let fmt = arguments[2] ? arguments[2] : 'll'
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
  return moment(timestamp * 1000).locale(locale).fromNow()
}

export function getTimestamp() {
  return Math.round((new Date()).getTime() / 1000)
}

// format trail data
export function calculatPointDistance(p1, p2) {
  let distLat = deg2rad(p2.latitude - p1.latitude),
      distLng = deg2rad(p2.longitude - p1.longitude),
      distAlt = (p2.altitude - p1.altitude) / 1000,
      a = Math.sin(distLat / 2),
      b = Math.sin(distLng / 2),
      c = a * a + b * b * Math.cos(deg2rad(p1.latitude)) * Math.cos(deg2rad(p2.latitude)),
      d = 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1-c)),
      e = earthRadiusInKm * d,
      f = Math.sqrt(e * e + distAlt * distAlt),
      g = parseFloat(f.toFixed(5))

  return g
}

export function calculateTrailData(points) {
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
    averageSpeed = Math.round(Math.abs(totalSpeed) / points.length) / 10

  return {
    date: firstPoint[0],
    totalDuration,
    totalDistance,
    totalElevation: Math.round(maximumAltitude - minimumAltitude),
    maximumAltitude,
    averageSpeed
  }
}

export function formatDuration(seconds) {
  if (isNumeric(seconds)) {
    let fmt = (arguments[1]) ? arguments[1] : 'h[' + hrs + ']m[' + min + ']'
    return moment.duration({'seconds': seconds}).format(fmt)
  }
}

export function formatTrailChartData(points) {
  let step = Math.floor(points.length / 10),
  arr = [],
  startTime = points[0][0]

  step = (step < 1) ? 1 : step

  points.map((point, index) => {
    if (index % step === 0) {
      arr.push([formatDuration((point[0] - startTime), 'h:mm'), point[3]])
    }
  })

  return arr
}

export function formatTrailChartDataWeb(points) {
  let step = Math.floor(points.length / 10),
  arr = {
    x: [],
    y: []
  },
  startTime = points[0][0]

  step = (step < 1) ? 1 : step

  points.map((point, index) => {
    if (index % step === 0) {
      arr.x.push(formatDuration((point[0] - startTime), 'h:mm'))
      arr.y.push(point[3])
    }
  })

  return arr
}

export function formatTrailPoints(points) {
  if (points.length > 0) {
    let path = points.map(function(arr) {
        return {
          latitude: arr[1],
          longitude: arr[2]
        }
      })
    return path
  }

  return null
}

export function getMapCenter(points) {
  let totalLat = 0,
    totalLng = 0,
    latArr = [],
    lngArr = []

  points.map(function(arr, index) {
    let lat = parseFloat(arr[1]),
      lng = parseFloat(arr[2])

    totalLat += lat,
    totalLng += lng,
    latArr.push(lat),
    lngArr.push(lng)
  })

  let latDelta = Math.max(...latArr) - Math.min(...latArr),
    lngDelta = Math.max(...lngArr) - Math.min(...lngArr)

  return {
    latitude: totalLat / points.length,
    longitude: totalLng / points.length,
    latitudeDelta: latDelta * 1.5,
    longitudeDelta: lngDelta * 1.5
  }
}

const earthRadiusInKm = 6371

function rad2deg(radians) {
  return radians * 180 / Math.PI
}

function deg2rad(degrees) {
  return degrees * Math.PI / 180
}

export function setRegion(point, aspectRatio) {
  let radiusInKm = arguments[2] || 0.5,
    radiusInRad = radiusInKm / earthRadiusInKm,
    latitudeDelta = rad2deg(radiusInRad / Math.cos(deg2rad(point.latitude))),
    longitudeDelta = aspectRatio * rad2deg(radiusInRad)

  return {
    latitude: point.latitude,
    longitude: point.longitude,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta
  }
}

export function showDifficultyLevel(level) {
  return (level / 2).toFixed(1)
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
  
  hex = (hex.indexOf('#') === 0) ? hex.substring(1) : hex

  let arr = hex.split(''),
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
  
  let r = parseInt(str[0], 16).toString(),
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
    eventGroupSizeArray = [1, 1.5, 2], 
    userLevelArray = [3.6, 2.3, 1.6, 1.2, 0.9],
    userLevel = user.level

  let durationIndex, 
    durationCoef,
    groupSizeIndex,
    groupSizeCoef,
    difficultyLevel

  let baseRate = event.expenses.perHead, 
    difficultyList = [], 
    eventDuration = event.schedule.length, 
    userLevelCoef = userLevelArray[userLevel]

  if (eventDuration < 2) {
    durationIndex = 0
  } else if (eventDuration > 1 && eventDuration < 6) {
    durationIndex = 1
  } else if (eventDuration > 5 && eventDuration < 10) {
    durationIndex = 2
  } else {
    durationIndex = 3
  }

  durationCoef = eventDurationArray[durationIndex]

  /*event.schedule.map((agenda) => {
    let trail = agenda.trail
    if (trail.type < 20) {
      difficultyList.push(trail.difficultyLevel)
    }
  })*/

  difficultyLevel = event.difficultyLevel

  if (event.maxAttendee > 29) {
    groupSizeIndex = 2
  } else if (event.maxAttendee < 2) {
    groupSizeIndex = 0
  } else {
    groupSizeIndex = 1
  }

  groupSizeCoef = eventGroupSizeArray[groupSizeIndex]

  let coef = (difficultyLevel * durationCoef * groupSizeCoef * userLevelCoef)

  return {
    baseRate,
    difficultyLevel,
    difficultyIndex: difficultyLevel / 2,
    durationCoef,
    durationIndex,
    groupSizeCoef,
    groupSizeIndex,
    userLevelCoef,
    userLevel,
    insurance: formatCurrency(baseRate * coef),
    cost: formatCurrency(baseRate * (1 + coef))
  }
}

export function formatCurrency(num) {
  return (Math.round(parseInt(num * 100)) / 100)
}


export function getPassProps(navigator) {
  let routeStack = navigator.getCurrentRoutes(0),
    currentPage = routeStack[routeStack.length - 1]

  return currentPage.passProps
}

export function getFileExtension(filename) {
  return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase()
}
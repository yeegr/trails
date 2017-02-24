'use strict'

let userAgent = navigator.userAgent,
  systemName = '', 
  systemVersion = '',
  language = navigator.language.split('-'),
  locale = language[0],
  country = language[1],
  width = window.innerWidth || document.documentElement.clientWidth,
  height = window.innerHeight || document.documentElement.clientHeight,
  browserList = ['Edge', 'Chrome', 'Mobile Safari', 'Firefox', 'OPR', 'MQQBrowser', 'MicroMessenger', 'UCBrowser'],
  browserName = '', 
  browserVersion = '', 
  browserEngine = '',
  browserEngineBuild = '',
  prefix = '',

  getVersion = (key, separator) => {
    let version = userAgent.substring(userAgent.indexOf(key) + key.length + 1)
    version = (version.indexOf(' ') > -1) ? version.substring(0, version.indexOf(separator)) : version
    return version.trim()
  }

if (userAgent.indexOf('Windows NT') > -1) {
  systemName = 'Windows'

  let tmp = getVersion('Windows NT', ';')

  switch(tmp) {
    case '6.0':
      systemVersion = 'XP'
    break

    case '6.1':
      systemVersion = 'Vista'
    break

    case '6.2':
      systemVersion = '7'
    break

    case '6.3':
      systemVersion = '8'
    break

    case '6.4':
      systemVersion = '8.1'
    break

    case '10.0':
      systemVersion = '10'
    break
  }
} else if (userAgent.indexOf('Android') > -1) {
  systemName = 'Android'
  systemVersion = getVersion(systemName, ';')
} else if (userAgent.match(/iP(ad|hone|od)/)) {
  systemName = 'iOS'
  let tmp = userAgent.substring(userAgent.indexOf(' OS ') + 3, userAgent.indexOf('like Mac OS X'))
  systemVersion = tmp.trim().replace('_', '.')
} else if (userAgent.indexOf('Mac OS X') > -1) {
  systemName = 'Mac OS X'
  systemVersion = getVersion(systemName, ')')
  systemVersion = systemVersion.replace(/_/g, '.')
} else if (userAgent.indexOf('Windows Phone') > -1) {
  systemName = 'Windows Phone';
  systemVersion = getVersion(systemName, userAgent, ';')
}

if (userAgent.indexOf('Trident') > -1) {
  if (userAgent.indexOf('IEMobile') > -1) {
    browserName = 'Internet Explorer Mobile';
    browserVersion = getVersion('IEMobile', ';')
  } else {
    browserName = 'Internet Explorer'
    browserVersion = userAgent.substring(userAgent.indexOf('rv:') + 3)
    browserVersion = parseFloat(browserVersion).toString()
  }

  browserEngine = 'Trident';
  browserEngineBuild = getVersion(browserEngine, ' ')
} else {
  browserList.forEach((name) => {
    if (userAgent.indexOf(name) > -1) {
      browserName = name
      browserVersion = getVersion(name, ' ')
    }
  })

  if (browserList.indexOf(browserName) < 0 && userAgent.indexOf('Safari') > -1) {
    browserName = 'Safari'
    browserVersion = getVersion('Version', ' ')
  }

  if (browserName === 'OPR') browserName = 'Opera'

  if (userAgent.indexOf('AppleWebKit') > -1) {
    browserEngine = 'Webkit'
    browserEngineBuild = getVersion('AppleWebKit', ' ')
  } else if (userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('like Gecko') < 0) {
    browserEngine = 'Gecko'
    browserEngineBuild = getVersion(browserEngine, ' ')
  }
}

export default {
  systemName,
  systemVersion,
  browserName,
  browserVersion,
  browserEngine,
  browserEngineBuild,
  userAgent,
  locale,
  country,
  height,
  width,
  pixelRatio: window.devicePixelRatio,
  screenHeight: window.screen.height,
  screenWidth: window.screen.width,
  actualHeight: window.devicePixelRatio * window.screen.height,
  actualWidth: window.devicePixelRatio * window.screen.width
}

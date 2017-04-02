'user strict'

module.exports = {
  DEFAULT_PAGINATION: 50,
  VIRTUAL_FIELDS: " likes likeCount saves saveCount shares shareCount comments commentCount ratingAverage",
  USER_LIST_FIELDS: "handle avatar xp level trails events posts comments followers",
  EVENT_LIST_FIELDS: "status title type hero excerpt contacts expenses groups",
  ACTIONS: {
    COMMON: ["CREATE", "UPDATE", "DELETE"],
    USER: ["FOLLOW", "UNFOLLOW", "APPLY", "RETRACT", "LIKE", "UNLIKE", "SAVE", "UNSAVE", "SHARE", "LOGIN"],
    ADMIN: ["APPROVE", "REJECT"]
  },
  TARGETS: {
    ACTION: ["User", "Area", "Trail", "Event", "Order", "Post", "Comment"],
    COMMENT: ["Area", "Trail", "Event", "Post"]
  },
  STATUSES: {
    AREA: ["editing", "pending", "approved", "rejected", "suspended"],
    TRAIL: ["editing", "pending", "approved", "rejected", "suspended"],
    EVENT: ["editing", "pending", "approved", "rejected", "updating", "suspended"],
    GROUP: ["accepting", "filled", "due"],
    SIGNUP: ["submitted", "pending", "approved", "rejected"],
    PAYMENT: ["pending", "success", "verified", "failed", "canceled", "processing", "duplicated", "network connection error", "unknown"],
    POST: ["editing", "pending", "approved", "published"],
    PRIVACY: ["private", "public"]
  },
  FILE_PATHS: {
    Area: 'areas',
    Trail: 'trails',
    Event: 'events',
    Post: 'posts',
    User: 'users',
  },
  ACCOUNT_ACTIONS: {
    LOGIN: "LOGIN",
    BIND: "BIND"
  },
  PAYMENT_MEDHODS: [
    "Alipay",
    "WeChatPay"
  ],
  ORDER_TYPES: [
    'signup'
  ],
  ORDER_CHANNELS: [
    'APP',
    'WEB'
  ],
  Roles: [
    'normal',
    'captain',
    'staff',
    'editor',
    'admin',
    'super'
  ],

  defaultUserAvatar: 'default.png',
  WeChatOpenId: 'WeChatOpenId',

  genderRx: /0|1/,
  levelRx: /[0-4]{1}/,
  mobileRx: /1\d{10}/,
  validatorRx: /\d{4}/,
  pidRx: /\d{18}/,
  currentcyRx: /\d{0,5}.\d{0,2}/,
  ipRx: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,

  demo: {
    mobile: 12345678901,
    vcode: '1234'
  },

  "WeChatPay": {
    "key": "o0okwfJ89pXirwmfmnjUF6oNoEGpeJxv",
    "APP": {
      "orderContent": {
        //"appid": "wx6e8a3e1b87c11294",
        //"mch_id": "1446937302",
        "appid": "wx08727837cbbd7bdc",
        "mch_id": "1452752702",
        "trade_type": "APP",
        "fee_type": "CNY",
        "device_info": "WEB",
        "sign_type": "MD5",
        "notify_url": "http://shitulv.com/api/wechat/notify"
      },
      "statuses": {
        "0": "success",
        "-1": "error",
        "-2": "canceled"
      }
    },
    "WEB": {
      "orderContent": {
        "appid": "wx08727837cbbd7bdc",
        "mch_id": "1452752702",
        "trade_type": "JSAPI",
        "fee_type": "CNY",
        "device_info": "WEB",
        "sign_type": "MD5",
        "notify_url": "http://shitulv.com/api/wechat/notify"
      },
      "statuses": {
        "0": "success",
        "-1": "error",
        "-2": "canceled"
      }
    }
  },

  "Alipay": {
    "app_id": "2016111902979618", // production
    "seller_id": "2088021102234564",
    "seller_email": "pay@shitulv.com",
    
    "APP": {
      "pubContent": {
        "app_id": "2016111902979618", // production
        //"app_id": "2016101500693227", // development
        "method": "alipay.trade.app.pay",
        "format": "JSON",
        "charset": "utf-8",
        "sign_type": "RSA",
        "version": "1.0",
        "notify_url": "http://shitulv.com/api/alipay/notify"
      },
      "bizContent": {
        "timeout_express": "15m",
        "seller_id": "2088021102234564",
        "seller_email": "pay@shitulv.com",
        "product_code": "QUICK_MSECURITY_PAY",
        "goods_type": "0",
        "enable_pay_channels": "balance,coupon,creditCard,debitCardExpress,pcard,promotion",
        "disable_pay_chanales": ""
      },
      "statuses": {
        "9000": "success",
        "8000": "pending",
        "4000": "failed",
        "5000": "duplicated",
        "6001": "canceled",
        "6002": "network connection error",
        "6004": "unknown"
      }
    },
    "WEB": {
      "apiRoot": "https://openapi.alipay.com/gateway.do?",
      "pubContent": {
        "app_id": "2016111902979618",  // production
        //"app_id": "2016101500693227", // development
        "method": "alipay.trade.wap.pay",
        "format": "JSON",
        "charset": "utf-8",
        "sign_type": "RSA",
        "version": "1.0",
        "return_url": "http://shitulv.com/api/alipay/return",
        "notify_url": "http://shitulv.com/aip/alipay/notify"
      },
      "bizContent": {
      },
      "statuses": {
        "9000": "success",
        "8000": "pending",
        "4000": "failed",
        "5000": "duplicated",
        "6001": "canceled",
        "6002": "network connection error",
        "6004": "unknown"
      }
    }
  }
}
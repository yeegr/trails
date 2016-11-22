'user strict'

module.exports = {
  DEFAULT_PAGINATION: 20,
  VIRTUAL_FIELS: " likes likeCount saves saveCount shares shareCount comments commentCount ratingAverage",
  USER_LIST_FIELDS: "handle avatar xp level trails events posts comments followers",
  ACTIONS: {
    COMMON: ["CREATE", "UPDATE", "DELETE"],
    USER: ["FOLLOW", "UNFOLLOW", "APPLY", "RETRACT", "LIKE", "UNLIKE", "SAVE", "UNSAVE", "SHARE"],
    ADMIN: ["APPROVE", "REJECT"]
  },
  TARGETS: {
    ACTION: ["User", "Area", "Trail", "Event", "Order", "Post", "Comment"],
    COMMENT: ["Area", "Trail", "Event", "Post"]
  },
  STATUSES: {
    AREA: ["submitting", "pending", "approved", "rejected", "suspended"],
    TRAIL: ["private", "submitting", "pending", "approved", "rejected", "suspended"],
    EVENT: ["private", "submitting", "pending", "approved", "rejected", "public", "suspended"],
    GROUP: ["accepting", "filled", "due"],
    SIGNUP: ["submitted", "pending", "approved", "rejected"],
    PAYMENT: ["pending", "paid"],
    POST: ["draft", "pending", "approved", "published"],
  },
  PAYMENT_MEDHODS: [
    "Alipay",
    "Wechat"
  ],
  Roles: [
    'normal',
    'captain',
    'staff',
    'editor',
    'admin',
    'super'
  ],

  genderRx: /0|1/,
  levelRx: /[0-4]{1}/,
  mobileRx: /1\d{10}/,
  validatorRx: /\d{4}/,
  pidRx: /\d{18}/,
  currentcyRx: /\d{0,5}.\d{0,2}/,
  ipRx: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,

  "Alipay": {
    "pubContent": {
      "app_id": "2016111902979618",
      "method": "alipay.trade.app.pay",
      "format": "JSON",
      "charset": "utf-8",
      "sign_type": "RSA",
      "version": "1.0",
      "notify_url" : "http://baidu.com"
    },
    "bizContent": {
      "timeout_express": "15m",
      "seller_id": "pay@shitulv.com",
      "product_code": "QUICK_MSECURITY_PAY",
      "goods_type": "0",
      "enable_pay_channels": "balance,coupon,creditCard,debitCardExpress,pcard,promotion",
      "disable_pay_chanales": ""
    }
  }
}
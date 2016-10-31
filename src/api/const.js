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
    PAYMENT: ["submitting", "pending", "received", "rejected"],
    POST: ["draft", "pending", "approved", "published"],
  },
  PAYMENT_MEDHODS: [
    "Alipay",
    "Wechat"
  ],

  genderRx: /0|1/,
  levelRx: /[0-4]{1}/,
  mobileRx: /1\d{10}/,
  validatorRx: /\d{4}/,
  pidRx: /\d{18}/,
  currentcyRx: /\d{0,5}.\d{0,2}/,
  ipRx: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,

  generateRandomString: function(length) {
    var charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    txt = ''

    for (var i = 0; i < length; i++) {
      txt += charList.charAt(Math.floor(Math.random() * charList.length))
    }

    return txt
  },

  generateRandomNumericString: function(length) {
    var num = Math.floor(Math.random() * Math.pow(10, length)),
      str = num.toString(),
      len = length - str.length,
      i = 0,
      padding = ''

    for (i; i < len; i++) {
      padding += '0'
    }

    return padding + str
  }
}
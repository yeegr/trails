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
  pidRx: /\d{18}/,
  currentcyRx: /\d{0,5}.\d{0,2}/,

  generateRandomString: function(length) {
    var charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    txt = ''

    for (var i = 0; i < length; i++) {
      txt += charList.charAt(Math.floor(Math.random() * charList.length))
    }

    return txt
  }
}
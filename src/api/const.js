'user strict'

var charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

module.exports = {
  DEFAULT_PAGINATION: 5,
  USER_LIST_FIELDS: "handle avatar xp level trails events posts comments followers",
  ACTIONS: {
    COMMON: ["CREATE", "UPDATE", "DELETE"],
    USER: ["FOLLOW", "UNFOLLOW", "APPLY", "RETRACT", "LIKE", "UNLIKE", "SAVE", "UNSAVE", "SHARE"],
    ADMIN: ["APPROVE", "REJECT"]
  },
  TARGETS: {
    ACTION: ["User", "Area", "Trail", "Event", "Post", "Comment"],
    COMMENT: ["Area", "Trail", "Event", "Post"]
  },
  STATUSES: {
    AREA: ["submitting", "pending", "approved", "rejected", "suspended"],
    TRAIL: ["private", "submitting", "pending", "approved", "rejected", "suspended"],
    EVENT: ["private", "submitting", "pending", "approved", "rejected", "completed", "suspended"],
    SIGNUP: ["submitting", "pending", "approved", "rejected", "completed"],
    PAYMENT: ["submitting", "pending", "received", "rejected"],
    POST: ["draft", "pending", "approved", "published"],
  },

  generateRandomString: function(length) {
    var txt = ''

    for (var i = 0; i < length; i++) {
      txt += charList.charAt(Math.floor(Math.random() * charList.length))
    }

    return txt
  }
}
module.exports = {
  getAverageRating: function(obj) {
    return Math.round(obj.ratingTotal / obj.comments.length * 2) / 2
  },

  getTimestamp: function() {
    return Date.now()
  },

  addToList: function(obj, arr, id) {
    if (typeof(id) === 'string') {
      if (arr && arr.indexOf(id) < 0) {
        arr.push(id)
      }
    } else if (typeof(id) === 'object') {
      let match = false,
        comp = JSON.parse(JSON.stringify(id))

      if (arr) {
        arr.map(function(item) {
          let tmp = JSON.parse(JSON.stringify(item))

          for (let prop in comp) {
            match = (tmp[prop] === comp[prop]) ? true : match
          }
        })

        if (!match) {
          arr.push(id)
        }
      }
    }

    obj.save()
  },

  removeFromList: function(obj, arr, id) {
    if (typeof(id) === 'string') {
      if (arr && arr.indexOf(id) > -1) {
        arr.splice(arr.indexOf(id), 1)
      }
    } else if (typeof(id) === 'object') {
      let comp = JSON.parse(JSON.stringify(id))

      if (arr) {
        arr.map(function(item, index) {
          let tmp = JSON.parse(JSON.stringify(item))

          for (let prop in comp) {
            if (tmp[prop] === comp[prop]) {
              arr.splice(index, 1)
            }
          }
        })
      }
    }

    obj.save()
  },

  addComment: function(obj, id, rating) {
    let arr = obj.comments

    if (arr && arr.indexOf(id) < 0) {
      arr.push(id)
      obj.ratingTotal += rating ? rating : 0
      obj.save()
    }
  },

  removeComment: function(obj, id, rating) {
    let arr = obj.comments

    if (arr && arr.indexOf(id) > -1) {
      arr.splice(arr.indexOf(id), 1)
      obj.ratingTotal -= rating ? rating : 0
      obj.save()
    }
  },

  updateModified: function(obj, fields) {
    let modified = false

    fields.map(function(key) {
      modified = (obj.isModified(key)) ? true : modified
    })

    if (modified) {
      obj.modified = this.getTimestamp()
    }
  },

  generateRandomString: function(length) {
    let charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    txt = ''

    for (let i = 0; i < length; i++) {
      txt += charList.charAt(Math.floor(Math.random() * charList.length))
    }

    return txt
  },

  generateRandomNumericString: function(length) {
    let num = Math.floor(Math.random() * Math.pow(10, length)),
      str = num.toString(),
      len = length - str.length,
      i = 0,
      padding = ''

    for (i; i < len; i++) {
      padding += '0'
    }

    return padding + str
  },

  getTimeFromId: function(id) {
    let timestamp = id.toString().substring(0, 8)
    return parseInt(timestamp, 16) * 1000
  },

  isNotUndefinedNullEmpty: function(input) {
    return (input !== undefined) && (input !== null) && (input.toString().length > 0) 
  }
}

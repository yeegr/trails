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
}

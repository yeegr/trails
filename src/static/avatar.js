var request = require('request'),
  fs = require('fs')

module.exports = function(app) {
  app.post('/avatar', function(req, res, next) {
    var dir = 'uploads/users/' + req.body.id

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    var file = fs.createWriteStream(dir + '/' + req.body.filename + '.jpg')
    request(req.body.url).pipe(file)

    file.on('error', (err) => {
      res.status(500).send(err)
    })

    file.on('finish', () => {
      res.status(201).send()
    })
  })
}

const request = require('request'),
  fs = require('fs')

module.exports = (app) => {
  app.post('/avatar', (req, res, next) => {
    let dir = 'uploads/users/' + req.body.id

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    let file = fs.createWriteStream(dir + '/' + req.body.filename + '.jpg')
    request(req.body.url).pipe(file)

    file.on('error', (err) => {
      res.status(500).json({error: err})
    })

    file.on('finish', () => {
      res.status(201).send()
    })
  })
}

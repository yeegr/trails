var express = require('express'),
	logger = require('morgan'),
	errorHandler = require('errorhandler'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
	mongoose = require('mongoose'),
	db = 'mongodb://mongodb:27017/trails',
  port = process.env.PORT || 3000,
  app = express(),
  router = express.Router()

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
	app.use(errorHandler())
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(cors())

mongoose.connect(db)

var log = require('./routes/log')(app),
	action = require('./routes/action')(app),
	settings = require('./routes/settings')(app),
	user = require('./routes/user')(app),
	area = require('./routes/area')(app),
	trail = require('./routes/trail')(app),
	event = require('./routes/event')(app)
	post = require('./routes/post')(app),
	order = require('./routes/order')(app)
	comment = require('./routes/comment')(app)

router.use(function(req, res, next) {
  next()
})

router.post('/drop', function(req, res, next) {
	var tables = ['logs', 'users', 'areas', 'trails', 'posts']

	tables.map(function(name) {
		mongoose.connection.collections[name].drop(function (err) {
			console.log('collection [' + name + '] is dropped!')
		})
	})

	res.status(200).send()
})

// REGISTER ROUTES
// =============================================================================
app.use('/', router)

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('API server running on port ' + port)
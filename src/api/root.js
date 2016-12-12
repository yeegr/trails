const express = require('express'),
	logger = require('morgan'),
	errorHandler = require('errorhandler'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
	formidable = require('formidable'),
  fs = require('fs'),
  request = require('request'),
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

const log = require('./routes/log')(app),
	action = require('./routes/action')(app),
	settings = require('./routes/settings')(app),
	user = require('./routes/user')(app),
	area = require('./routes/area')(app),
	trail = require('./routes/trail')(app),
	event = require('./routes/event')(app)
	post = require('./routes/post')(app),
	order = require('./routes/order')(app),
	comment = require('./routes/comment')(app),
	validate = require('./routes/validate')(app)


const CONST = require('./const'),
	Area = require('./models/area'),
	Trail = require('./models/trail'),
	Event = require('./models/event'),
	Post = require('./models/post'),
	User = require('./models/user')

router.use(function(req, res, next) {
  next()
})

// delete mongodb collection(s)
router.post('/drop/:table', function(req, res, next) {
	let table = req.params.table,
	tables = (table === 'all') ? ['actions', 'areas', 'events', 'logs', 'orders', 'posts', 'users', 'trails', 'validates'] : [table]

	tables.map(function(name) {
		mongoose.connection.collections[name].drop(function (err) {
			console.log('collection [' + name + '] is dropped!')
		})
	})

	res.status(200).send()
})

// upload photos to properties
router.put('/photos', (req, res, next) => {
	let form = new formidable.IncomingForm()

	form.parse(req, (err, fields, files) => {
		let arr = []
		
		for (let i in files) {
			arr.push(files[i])
		}

		uploadFile(fields.type, fields.id, arr, 0, [], res)
	})
})

function uploadFile(type, id, inputs, index, outputs, res) {
	let file = inputs[index],
		url = 'http://graphics:8000/up',
		path = CONST.PATHS[type] + '/' + id + '/',
		formData = {
			file: {
				value: fs.createReadStream(file.path),
				options: {
					filename: file.name
				}
			},
			path
		}

	request.post({url, formData}, (err, response, body) => {
		if (err) console.log(err)
		outputs.push({url: file.name})

		if (index < inputs.length - 1) {
			index++
			uploadFile(type, id, inputs, index, outputs, res)
		} else {
			saveFiles(type, id, outputs, res)
		}
	})
}

function saveFiles(type, id, photos, res) {
	let model

	switch (type) {
		case 'Area':
			model = Area
		break

		case 'Trail':
			model = Trail
		break

		case 'Event':
			model = Event
		break

		case 'Post':
			model = Post
		break

		case 'User':
			model = User
		break
	}

	model
	.findById(id)
	.exec()
	.then((data) => {
		data
		.set({photos})
		.save()
		.then((saved) => {
			console.log(saved)
			if (saved) {
				res.status(201).json(saved)
			}
		})
		.catch((err) => {
			res.status(500).json({error: err})
		})
	})
	.catch((err) => {
		res.status(404).json({error: err})
	})
}

// REGISTER ROUTES
// =============================================================================
app.use('/', router)

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('Environmental variables: ', process.env)
console.log('API server running on port: ', port)
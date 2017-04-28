const express = require('express'),
  fs = require('fs'),
	crypto = require('crypto'),
  bodyParser = require('body-parser'),
	errorHandler = require('errorhandler'),
  cors = require('cors'),
	formidable = require('formidable'),
	logger = require('morgan'),
	mongoose = require('mongoose'),
  request = require('request'),
  moment = require('moment'),
	db = 'mongodb://mongodb:27017/trails',
  port = process.env.PORT || 3000,
  app = express(),
  router = express.Router()

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
	app.use(errorHandler())
}

app.use(bodyParser.json({limit: '100mb'}))
app.use(bodyParser.urlencoded({
	limit: '100mb',
	extended: true
}))
app.use(cors())

mongoose.connect(db)

//routes
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
	validate = require('./routes/validate')(app),
	helper = require('./routes/helper')(app)

//data models
const CONST = require('./const'),
	Area = require('./models/area'),
	Trail = require('./models/trail'),
	Event = require('./models/event'),
	Post = require('./models/post'),
	User = require('./models/user')

//misc
const WX = require('./wx')(app)

router.use((req, res, next) => {
  next()
})

// delete mongodb collection(s)
router.post('/drop/:table', (req, res, next) => {
	let table = req.params.table,
		tables = (table === 'all') ? ['actions', 'areas', 'events', 'logs', 'orders', 'posts', 'users', 'trails', 'validates'] : [table],
		remoteAddress = req.connection.remoteAddress,
		ip = remoteAddress.substring(remoteAddress.lastIndexOf(':') + 1)

	tables.map((name) => {
		mongoose.connection.collections[name].drop((err) => {
			console.log(moment().format('YYYY-MM-DDTHH:mm:ssZ') + ' | ' + ip + ' | [' + name + '] is dropped!')
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

		if (arr.length > 0) {
			uploadFile(fields.type, fields.id, arr, 0, [], res)
		} else {
			res.status(201).json()
		}
	})
})

//upload file via static server
function uploadFile(type, id, inputs, index, outputs, res) {
	let file = inputs[index],
		url = 'http://static:3000/up',
		path = CONST.FILE_PATHS[type] + '/' + id + '/',
		formData = {
			file: {
				value: fs.createReadStream(file.path),
				options: {
					filename: file.name
				}
			},
			path
		}

	request.post({
		url,
		formData
	}, (err, response, body) => {
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

//save file path (or name) array to database
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
console.log('====================================')

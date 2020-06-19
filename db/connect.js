const mongoose = require('mongoose')
const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
}

const { DB_URI } = process.env
try {
	mongoose.connect(DB_URI, options)
} catch (error) {
	console.log(error)
}
const db = mongoose.connection

db.on('error', function (err) {
	console.log(`Error connecting to DB ${DB_URI}`)
})
db.once('open', function callback() {
	console.log(`Connecting to DB ${DB_URI}... Ok`)
})

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log(
			'Mongoose default connection disconnected through app termination'
		)
		process.exit(0)
	})
})

module.exports = db

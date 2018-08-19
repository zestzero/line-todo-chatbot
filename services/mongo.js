const mongoose = require('mongoose')

exports.init = ({ mongodbUri }) => (app) => {
  mongoose.connect(mongodbUri, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('MongoDB connected!')
    app()
  })
}

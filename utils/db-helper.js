const mongoose = require('mongoose')
const TaskModel = require('../models/schemas/task')

exports.dbUp = (done) => {
  mongoose.connect('mongodb://localhost/testDatabase', { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error'))
  db.once('open', () => {
    done()
  })
}

exports.reset = async () => {
  await TaskModel.remove({})
}

exports.dbDown = (done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(done)
  })
}

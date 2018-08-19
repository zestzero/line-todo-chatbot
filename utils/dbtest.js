const mongoose = require('mongoose')
const TaskDB = require('../db/schemas/task')

exports.dbUp = (done) => {
  mongoose.connect('mongodb://localhost/testDatabase', { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error'))
  db.once('open', () => {
    done()
  })
}

exports.reset = async () => {
  await TaskDB.remove({})
}

exports.dbDown = (done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(done)
  })
}

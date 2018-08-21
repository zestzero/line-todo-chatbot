require('dotenv').config()

const express = require('express')
const path = require('path')
const Routes = require('./routes/routes')
const MongoController = require('./services/mongo')

const app = express()

MongoController.init({ mongodbUri: process.env.MONGODB_URI })(function () {
  // Serve client
  app.use(express.static(path.join(__dirname, 'client/build')))

  // Init routes
  Routes.init(app)
})

const server = app.listen(process.env.PORT, function () {
  const port = server.address().port
  console.log('Listening at http://localhost:%s', port)
})

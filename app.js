require('dotenv').config()

const express = require('express')
const Routes = require('./routes/routes')
const MongoController = require('./services/mongo')

const app = express()

MongoController.init({ mongodbUri: process.env.MONGODB_URI })(function () {
  Routes.init(app)
})

const server = app.listen(process.env.PORT, function () {
  const port = server.address().port
  console.log('Example app listening at http://localhost:%s', port)
})

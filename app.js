require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./routes/routes')
const MongoController = require('./services/mongo')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

MongoController.init({ mongodbUri: process.env.MONGODB_URI })(function () {
  Routes.init(app)
})

const server = app.listen(process.env.PORT, function () {
  const port = server.address().port
  console.log('Example app listening at http://localhost:%s', port)
})

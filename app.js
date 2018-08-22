require('dotenv').config()

const express = require('express')
const path = require('path')
const Routes = require('./routes/routes')
const MongoController = require('./services/mongo')

const app = express()
app.use(express.static(path.join(__dirname, 'client/build')))

MongoController.init({ mongodbUri: process.env.MONGODB_URI })(() => {
  // Init routes
  Routes.init(app)

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
})

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port
  console.log('Listening at http://localhost:%s', port)
})

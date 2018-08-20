const line = require('@line/bot-sdk')
const bodyParser = require('body-parser')
const { getEventHandler } = require('../services/event')
const Apis = require('./apis')

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
}

const lineClient = new line.Client(config)
const handleEvent = getEventHandler(lineClient)

exports.init = (app) => {
  app.post('/callback', line.middleware(config), async (req, res) => {
    try {
      const result = await Promise.all(req.body.events.map(handleEvent))
      res.json(result)
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })

  app.use(bodyParser.json())
  app.use('/api', Apis)
}

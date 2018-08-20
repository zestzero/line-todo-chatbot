const { parseAction } = require('./actions')

// Ref URL: https://developers.line.me/en/reference/messaging-api/#webhook-event-objects
// event.source.tyoe && event.source.userId

exports.getEventHandler = (client) => async (event) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null)
  }

  // Parse text to action
  parseAction(event.message.text)

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text }

  // use reply API
  return client.replyMessage(event.replyToken, echo)
}

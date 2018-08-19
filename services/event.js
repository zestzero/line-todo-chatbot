// Ref URL: https://developers.line.me/en/reference/messaging-api/#webhook-event-objects
// event.source.tyoe && event.source.userId

exports.getEventHandler = (client) => {
  return function handleEvent (event) {
    if (event.type !== 'message' || event.message.type !== 'text') return null

    const echo = { type: 'text', text: event.message.text }
    return client.replyMessage(event.replyToken, echo)
  }
}

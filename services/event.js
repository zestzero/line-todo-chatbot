const { parseAction, isEditMode } = require('./actions')
const { createTask } = require('./task')

// Ref URL: https://developers.line.me/en/reference/messaging-api/#webhook-event-objects
// event.source.tyoe && event.source.userId

exports.getEventHandler = (client) => async (event) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null)
  }

  if (isEditMode(event.message.text)) {
    const echo = { type: 'text', text: 'line://app/1601405149-MYeKOvk2' }
    return client.replyMessage(event.replyToken, echo)
  }

  // Parse text to action
  const { error, content, dateTime } = parseAction(event.message.text)
  let text = ''

  if (error) {
    text = error
  } else {
    const result = await createTask({ ownerId: event.source.userId, content, dateTime })
    text = `created task: ${result.id}`
  }

  // create a echoing text message
  const echo = { type: 'text', text }

  // use reply API
  return client.replyMessage(event.replyToken, echo)
}

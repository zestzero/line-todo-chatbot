const { parseAction, isEditMode } = require('./actions')
const { createTask } = require('./task')

// Ref URL: https://developers.line.me/en/reference/messaging-api/#webhook-event-objects

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
  const { error, content, date, time } = parseAction(event.message.text)

  if (error) {
    client.replyMessage(event.replyToken, { type: 'text', text: error })
  }

  const result = await createTask({ ownerId: event.source.userId, content, date, time })
  const text = `\udbc0\udc41 ${result.title}`
  const echo = { type: 'text', text }
  return client.replyMessage(event.replyToken, echo)
}

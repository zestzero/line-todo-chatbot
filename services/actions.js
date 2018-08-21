const _ = require('lodash')
const moment = require('moment')
const { DATE_OFFSET, ERROR_MSG } = require('../utils/constants')

function handleDate (date) {
  const isValidDateFormat = (date) => RegExp(/^([1-9]|[12][0-9]|3[01])(\/)(?:([1-9]|1[012])(\/)[0-9]{2})$/).test(date)
  const offsetDate = DATE_OFFSET[date]

  if (!_.isUndefined(offsetDate)) return moment().add(offsetDate, 'days').format('D/M/YY')
  if (!isValidDateFormat(date)) return null

  return date
}

function handleTime (time) {
  const isValidTimeFormat = (time) => RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).test(time)

  if (_.isUndefined(time)) return '00:00'
  if (!isValidTimeFormat(time)) return null

  return time
}

exports.parseAction = (text) => {
  const actions = text.split(' : ')
  const isValidAction = (length) => length >= 2 && length <= 3

  if (isValidAction(actions.length)) {
    const date = handleDate(actions[1])
    const time = handleTime(actions[2])

    if (date && time) {
      return {
        content: actions[0],
        date,
        time
      }
    }
  }
  return { error: ERROR_MSG.ACTION.INVALID }
}

exports.isEditMode = (text) => {
  return text === 'edit'
}

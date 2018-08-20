const moment = require('moment')
const { DATE_TIME_FORMAT } = require('./constants')

function getMomentFromDateTime (date, time) {
  return moment(`${date} ${time}`, DATE_TIME_FORMAT, true)
}

exports.getFormatDateTime = (date, time) => {
  const result = getMomentFromDateTime(date, time)
  if (result.isValid()) return result.format()
  return null
}

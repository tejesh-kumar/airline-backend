const moment = require('moment')

const getUTCDateString = (inputDate, format = 'YYYY-MM-DD HH:mm:ss') => {
  const utc = moment.utc(inputDate, format)
  const isoString = utc.toISOString()
  return isoString
}

module.exports = { getUTCDateString }

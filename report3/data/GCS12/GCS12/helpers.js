const jsreport = require('jsreport-proxy')
const dayjs = await jsreport.npm.require('dayjs@1')
const buddhistEra = require('dayjs/plugin/buddhistEra')
dayjs.extend(buddhistEra)

function dateTimeFormatter(data) {
  return dayjs(data).format('DD/MM/BB HH:mm');
}
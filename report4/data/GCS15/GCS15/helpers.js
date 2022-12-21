const jsreport = require('jsreport-proxy')
const dayjs = await jsreport.npm.require('dayjs@1')
const buddhistEra = require('dayjs/plugin/buddhistEra')
dayjs.extend(buddhistEra)

function SUM(data) {
  let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0;i < data.length;i++) {
    temp[0] += data[i].P1 || 0
    temp[1] += data[i].P2 || 0
    temp[2] += data[i].P3 || 0
    temp[3] += data[i].P4 || 0
    temp[4] += data[i].P5 || 0
    temp[5] += data[i].P6 || 0
    temp[6] += data[i].P7 || 0
    temp[7] += data[i].P8 || 0
    temp[8] += data[i].P9 || 0
    temp[9] += data[i].P10 || 0
    temp[10] += data[i].P11 || 0
    temp[11] += data[i].P12 || 0
    temp[12] += data[i].P13 || 0
    temp[13] += data[i].P14 || 0
  }

  for (let i = 0;i < temp.length;i++) {
    temp[i] = numberFormatter(temp[i])
  }
  
  return temp
}

function numberFormatter (number) {
  if (!number) return 0
  return new Intl.NumberFormat().format(number)
}

function dateFormatter (data) {
  return dayjs(data).format('DD/MM/BB');
}
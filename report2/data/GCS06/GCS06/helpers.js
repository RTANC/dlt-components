function toJSON(data) {
  return JSON.stringify(data);
}

function numberFormatter (number) {
  if (!number) return 0
  return new Intl.NumberFormat().format(number)
}

function numberFormatter2 (number) {
  if (!number) return 0
  return new Intl.NumberFormat().format(number/1000)
}

function timeFormatter (time) {
  return time.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':'
}

function sum (a, b ,c, d) {
  return new Intl.NumberFormat().format((a + b + c + d))
}

function sum2 (a, b ,c, d) {
  return new Intl.NumberFormat().format((a + b + c + d)/1000)
}

function getCategories (data) {
  return JSON.stringify(data.map(x => x.ByDateTime))
}

function getData (data) {
  return JSON.stringify(data.map(x => (numberFormatter(x.NVehIN))))
}

function getData2 (data) {
  return JSON.stringify(data.map(x => (numberFormatter(x.NVehOUT))))
}

function getData3 (data) {
  return JSON.stringify(data.map(x => (numberFormatter(x.WGoodsWOUT/1000))))
}

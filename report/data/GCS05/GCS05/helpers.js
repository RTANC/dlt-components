function toJSON(data) {
  return JSON.stringify(data);
}

function numberFormatter (number) {
  if (!number) return 0
  return new Intl.NumberFormat().format(number)
}

function timeFormatter (time) {
  return time.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':'
}

function sum (a, b ,c) {
  return new Intl.NumberFormat().format((a + b + c))
}
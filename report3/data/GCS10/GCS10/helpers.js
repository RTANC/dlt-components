function toJSON(data) {
  return JSON.stringify(data);
}

function numberFormatter (number) {
  if (!number) return 0
  return new Intl.NumberFormat().format(number)
}
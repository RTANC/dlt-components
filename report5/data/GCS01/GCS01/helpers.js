function toJSON(data) {
  return JSON.stringify(data);
}

function numberFormatter (number) {
  return new Intl.NumberFormat().format(number)
} 
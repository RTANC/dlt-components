function toJSON(data) {
  return JSON.stringify(data);
}

function sum(x , y) {
  return new Intl.NumberFormat().format(parseInt(x + y));
}

function subtract(x, y) {
  return new Intl.NumberFormat().format(parseInt(x - y));
}
function toJSON(data) {
  return JSON.stringify(data);
}

function numberFormatter (NCount, MinUsed) {
  if (NCount > 0 && MinUsed >= 0) {
    return new Intl.NumberFormat().format(parseInt(MinUsed/NCount/60) + ((MinUsed/NCount/60) - (parseInt(MinUsed/NCount/60))))
  } else {
    return 0
  }
}

function getCategories (data) {
  return JSON.stringify(data.map(x => x.Operator))
}

function getData (data) {
  return JSON.stringify(data.map(x => (numberFormatter(x.NCount, x.MinUsed))))
}
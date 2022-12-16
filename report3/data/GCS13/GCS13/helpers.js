function toJSON(data) {
  return JSON.stringify(data);
}

function numberFormatter (NCount) {
  if (NCount > 0) {
    return new Intl.NumberFormat().format(parseInt(NCount))
  } else {
    return 0
  }
}

function getCategories (data) {
  return JSON.stringify(data.map(x => x.Description))
}

function getData1 (data) {
  return JSON.stringify(data.map(x => (numberFormatter(x.Qty))))
}

function getData2 (data) {
  return JSON.stringify(data.map(x => (numberFormatter(x.GoodsW))))
}
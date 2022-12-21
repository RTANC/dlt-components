function SUM(data) {
  let temp = [0, 0, 0];
  for (let i = 0;i < data.length;i++) {
    temp[0] += data[i].NVehicle
    temp[1] += data[i].Qty
    temp[2] += data[i].GoodsW / 1000
  }

  for (let i = 0;i < temp.length;i++) {
    temp[i] = numberFormatter(temp[i])
  }
  
  return temp
}

function numberFormatter (NCount) {
  if (NCount > 0) {
    return new Intl.NumberFormat().format(parseInt(NCount))
  } else {
    return 0
  }
}

function numberFormatte2 (NCount) {
  if (NCount > 0) {
    return new Intl.NumberFormat().format(parseInt(NCount)/1000)
  } else {
    return 0
  }
}

function getCategories (data) {
  return JSON.stringify(data.map(x => x.Description))
}

function getData1 (data) {
  return JSON.stringify(data.map(x => (x.Qty)))
}

function getData2 (data) {
  return JSON.stringify(data.map(x => (x.GoodsW/1000)))
}
function SUM(data) {
  let temp = [0];
  for (let i = 0;i < data.length;i++) {
    if (data[i].NCount > 0 && data[i].MinUsed >= 0) {
      temp[0] += (parseInt(data[i].MinUsed/data[i].NCount/60) + ((data[i].MinUsed/data[i].NCount/60) - (parseInt(data[i].MinUsed/data[i].NCount/60))))
    } else {
      temp[0] += 0
    }
  }

  for (let i = 0;i < temp.length;i++) {
    temp[i] = new Intl.NumberFormat().format(temp[i])
  }
  
  return temp
}

function numberFormatter (NCount, MinUsed) {
  if (NCount > 0 && MinUsed >= 0) {
    return new Intl.NumberFormat().format(parseInt(MinUsed/NCount/60) + ((MinUsed/NCount/60) - (parseInt(MinUsed/NCount/60))))
  } else {
    return 0
  }
}

function getCategories (data) {
  return JSON.stringify(data.map(x => x.Description))
}

function getData (data) {
  return JSON.stringify(data.map(x => (numberFormatter(x.NCount, x.MinUsed))))
}
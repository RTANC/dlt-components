function SUM(data) {
  let temp = [0, 0, 0, 0, 0, 0];
  for (let i = 0;i < data.length;i++) {
    temp[0] += data[i].N_YES || 0
    temp[1] += data[i].N_MATCHED + data[i].N_UNMATCHED
    temp[2] += data[i].N_MATCHED || 0
    temp[3] += data[i].N_UNMATCHED || 0
    temp[4] += parseInt(Math.abs(data[i].N_YES - data[i].N_MATCHED - data[i].N_UNMATCHED))
    temp[5] += data[i].N_OVERDAY || 0
  }

  for (let i = 0;i < temp.length;i++) {
    temp[i] = numberFormatter(temp[i])
  }
  
  return temp
}

function sum(x , y) {
  return new Intl.NumberFormat().format(parseInt(x + y));
}

function subtract(x, y, z) {
  return new Intl.NumberFormat().format(parseInt(Math.abs(x - y - z)));
}

function numberFormatter (number) {
  if (number > 0) {
    return new Intl.NumberFormat().format(parseInt(number))
  } else {
    return 0
  }
}
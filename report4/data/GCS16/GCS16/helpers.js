function SUM(data) {
  let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0;i < data.length;i++) {
    temp[0] += data[i].NSend || 0
    temp[1] += data[i].NReceive || 0
    temp[2] += data[i].NSendReceive || 0
    temp[3] += data[i].NOthers || 0
    temp[4] += data[i].NSend + data[i].NReceive + data[i].NSendReceive + data[i].NOthers
    temp[5] += data[i].WSend || 0
    temp[6] += data[i].WReceive || 0
    temp[7] += data[i].WSendReceive || 0
    temp[8] += data[i].WOthers || 0
    temp[9] += ((data[i].WSend + data[i].WReceive + data[i].WSendReceive + data[i].WOthers) / 1000)
    temp[10] += data[i].NVehCHK || 0
  }

  for (let i = 0;i < temp.length;i++) {
    temp[i] = numberFormatter(temp[i])
  }
  
  return temp
}

function numberFormatter (number) {
  if (!number) return 0
  return new Intl.NumberFormat().format(number)
}

function numberFormatter2 (number) {
  if (!number) return 0
  return new Intl.NumberFormat().format(number/1000)
}

function sum (a, b ,c, d) {
  return new Intl.NumberFormat().format((a + b + c + d))
}

function sum2 (a, b ,c, d) {
  return new Intl.NumberFormat().format((a + b + c + d)/1000)
}
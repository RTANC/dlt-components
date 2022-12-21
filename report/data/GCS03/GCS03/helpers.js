function SUM(data) {
  let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0;i < data.length;i++) {
    temp[0] += data[i].TotalCar || 0
    temp[1] += data[i].TotalWeight || 0
    temp[2] += data[i].C_S || 0
    temp[3] += data[i].C_R || 0
    temp[4] += data[i].C_SR || 0
    temp[5] += data[i].C_O || 0
    temp[6] += data[i].C_ALL || 0
    temp[7] += data[i].W_S || 0
    temp[8] += data[i].W_R || 0
    temp[9] += data[i].W_SR || 0
    temp[10] += data[i].W_O || 0
    temp[11] += data[i].W_ALL || 0
    temp[12] += data[i].C_CHECK || 0
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

function getDataChart1 (data) {
  const chartData = [{
            "name": "ส่งสินค้า",
            "data": (data.map(x => x.C_S))
        },
        {
            "name": "รับสินค้า",
            "data": (data.map(x => x.C_R))
        },
        {
            "name": "รับและส่งสินค้า",
            "data": (data.map(x => x.C_SR))
        },
        {
            "name": "อื่นๆ",
            "data": (data.map(x => x.C_O))
        }
  ]
  return JSON.stringify(chartData)
}

function getDataChart2 (data) {
  const chartData = [{
            "name": "ส่งสินค้า",
            "data": (data.map(x => x.W_S || 0))
        },
        {
            "name": "รับสินค้า",
            "data": (data.map(x => x.W_R || 0))
        },
        {
            "name": "รับและส่งสินค้า",
            "data": (data.map(x => x.W_SR || 0))
        },
        {
            "name": "อื่นๆ",
            "data": (data.map(x => x.W_O || 0))
        }
  ]
  return JSON.stringify(chartData)
}

function getCategories (data) {
  return JSON.stringify(data.map(x => x.CompanyName))
}
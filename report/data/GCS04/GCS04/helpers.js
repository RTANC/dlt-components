function toJSON(data) {
  return JSON.stringify(data);
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
  return JSON.stringify(data.map(x => x.Description))
}
function toJSON(data) {
  return JSON.stringify(data);
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

function ymFormatter (dt) {
  return (new Date(dt).toLocaleDateString('th-TH', {month: 'long', year: '2-digit'}))
}

function getCategories (data) {
  return JSON.stringify(data.map(x => ymFormatter(x.ByDateTime)))
}

function getData (data) {
  return JSON.stringify(data.map(x => (x.NVehIN)))
}

function getData2 (data) {
  return JSON.stringify(data.map(x => (x.NVehOUT)))
}

function getData3 (data) {
  return JSON.stringify(data.map(x => (x.WGoodsWOUT/1000)))
}

function getData4 (data) {
  const chartData = [{
            "name": "ส่งสินค้า",
            "data": (data.map(x => x.NSend))
        },
        {
            "name": "รับสินค้า",
            "data": (data.map(x => x.NReceive))
        },
        {
            "name": "รับและส่งสินค้า",
            "data": (data.map(x => x.NSendReceive))
        },
        {
            "name": "อื่นๆ",
            "data": (data.map(x => x.NOthers))
        }
  ]
  return JSON.stringify(chartData)
}

function getData5 (data) {
  const chartData = [{
            "name": "ส่งสินค้า",
            "data": (data.map(x => numberFormatter(x.WSend/1000)))
        },
        {
            "name": "รับสินค้า",
            "data": (data.map(x => numberFormatter(x.WReceive/1000)))
        },
        {
            "name": "รับและส่งสินค้า",
            "data": (data.map(x => numberFormatter(x.WSendReceive/1000)))
        },
        {
            "name": "อื่นๆ",
            "data": (data.map(x => numberFormatter(x.WOthers/1000)))
        }
  ]
  return JSON.stringify(chartData)
}
const jsreport = require('jsreport-proxy')
const moment = await jsreport.npm.require('moment@2.29.3')

function SUM(data) {
  let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0;i < data.length;i++) {
    temp[0] += data[i].NVehIN || 0
    temp[1] += data[i].NVehOUT || 0
    temp[2] += (parseInt(data[i].WGoodsWOUT)/1000) || 0
    temp[3] += data[i].NSend || 0
    temp[4] += data[i].NReceive || 0
    temp[5] += data[i].NSendReceive || 0
    temp[6] += data[i].NOthers || 0
    temp[7] += (data[i].NSend + data[i].NReceive + data[i].NSendReceive + data[i].NOthers) || 0
    temp[8] += (data[i].WSend / 1000) || 0
    temp[9] += (data[i].WReceive / 1000) || 0
    temp[10] += (data[i].WSendReceive / 1000) || 0
    temp[11] += (data[i].WOthers / 1000) || 0
    temp[12] += ((data[i].WSend + data[i].WReceive + data[i].WSendReceive + data[i].WOthers) / 1000) || 0
    temp[13] += data[i].NVehCHK || 0
  }

  for (let i = 0;i < temp.length;i++) {
    temp[i] = numberFormatter(temp[i])
  }
  
  return temp
}

function startBudgetYear(dt) {
    const y = moment(dt).year()
    const m = moment(dt).month()
    if (m >= 9) {
      return moment().set({'year': y, 'month': 9, 'date': 1, 'hour': 0, 'minute': 0, 'second': 0})
    } else if (m < 9) {
      return moment().set({'year': (y-1), 'month': 9, 'date': 1, 'hour': 0, 'minute': 0, 'second': 0})
    }
    
}

function endBudgetYear (dt) {
    const y = moment(dt).year()
    const m = moment(dt).month()
    if (m >= 9 && m <= 11) {
      return moment().set({'year': (y + 1), 'month': 8, 'date': 30, 'hour': 23, 'minute': 59, 'second': 59})
    } else if (m >= 0 && m < 9) {
      return moment().set({'year': y, 'month': 8, 'date': 30, 'hour': 23, 'minute': 59, 'second': 59})
    }
}

function getBudgetYear (dt) {
  const y = moment(dt).year()
  const m = moment(dt).month()
  if (m >= 0 && m < 9) {
    return y + 543
  } else if (m >= 9 && m <= 11) {
    return y + 1 + 543
  }
}

function numberFormatter (number) {
  if (!number) return 0
  return new Intl.NumberFormat().format(number)
}

function numberFormatter2 (number) {
  if (!number) return 0
  return new Intl.NumberFormat('us', {maximumFractionDigits: 2}).format(number/1000)
}

function sum (a, b ,c, d) {
  return new Intl.NumberFormat().format((a + b + c + d))
}

function sum2 (a, b ,c, d) {
  return new Intl.NumberFormat('us', {maximumFractionDigits: 2}).format((a + b + c + d)/1000)
}

function getCategories (data) {
  return JSON.stringify(data.map(x => getBudgetYear(x.ByDateTime)))
}

function getData (data) {
  return JSON.stringify(data.map(x => (x.NVehIN)))
}

function getData2 (data) {
  return JSON.stringify(data.map(x => (x.NVehOUT)))
}

function getData3 (data) {
  return JSON.stringify(data.map(x => ((x.WGoodsWOUT/1000))))
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
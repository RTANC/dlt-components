const jsreport = require('jsreport-proxy')
const _ = await jsreport.npm.require('lodash@4.17.15')

function toJSON(data) {
  return JSON.stringify(data);
}

function reportDataFormatter (resp) {
  const maxComId = _.maxBy(resp,'CompanyID')
  // const maxSrc = (_.maxBy(resp,'SrcProvinceID')).SrcProvinceID
  // const maxDst = (_.maxBy(resp,'DstProvinceID')).DstProvinceID

  let mat = new Array(((maxComId.CompanyID) + 1))
  for (let i = 0; i < ((maxComId.CompanyID) + 1);i++) {
    mat[i] = new Array(80)
    for (let j = 0; j < 80 ;j++) {
      mat[i][j] = new Array(80)
      for (let k = 0; k < 80;k++) {
        mat[i][j][k] = {CompanyName: '', TransportType: '', TransportScope: '', SrcProvinceName: '', DstProvinceName: '', TransportLicenseID: '', GoodsW: 0, P1: 0, P2: 0, P3: 0, P4: 0, P5: 0, P6: 0, P7: 0, P8: 0, P9: 0, dy: 0, accessed: false}
      }
    }
  }

  let result = []
  for (let i = 0;i < resp.length;i++) {
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].CompanyName = resp[i].CompanyName
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].TransportType = resp[i].TransportType
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].TransportScope = resp[i].TransportScope
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].TransportLicenseID = resp[i].TransportLicenseID
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].SrcProvinceName = resp[i].SrcProvinceName
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].DstProvinceName = resp[i].DstProvinceName
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].GoodsW += resp[i].GoodsW
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P1 += resp[i].P1
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P2 += resp[i].P2
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P3 += resp[i].P3
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P4 += resp[i].P4
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P5 += resp[i].P5
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P6 += resp[i].P6
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P7 += resp[i].P7
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P8 += resp[i].P8
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P9 += resp[i].P9
    if (mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].dy === 0) {
      if (resp[i].P1 !== 0) mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].dy += 1;
      if (resp[i].P2 !== 0) mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].dy += 1;
      if (resp[i].P3 !== 0) mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].dy += 1;
      if (resp[i].P4 !== 0) mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].dy += 1;
      if (resp[i].P5 !== 0) mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].dy += 1;
      if (resp[i].P6 !== 0) mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].dy += 1;
      if (resp[i].P7 !== 0) mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].dy += 1;
      if (resp[i].P8 !== 0) mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].dy += 1;
      if (resp[i].P9 !== 0) mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].dy += 1;
    }
  }

  for (let i = 0;i < resp.length;i++) {
    if (mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].accessed === false) {
      result.push(mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID])
      mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].accessed = true
    }
  }

  let outputs = []
  if (result.length > 0) {
    outputs = [{
      CompanyName: result[0].CompanyName,
      TransportLicenseID: result[0].TransportLicenseID,
      TransportScope: result[0].TransportScope,
      TransportType: result[0].TransportType,
      totalGw: (result[0].GoodsW / result[0].dy) / 1000,
      totalV: result[0].P1 + result[0].P2 + result[0].P3 + result[0].P4 + result[0].P5 + result[0].P6 + result[0].P7 + result[0].P8 + result[0].P9,
      totalDy: result[0].dy,
      Tx: [{
        SrcProvinceName: result[0].SrcProvinceName,
        DstProvinceName: result[0].DstProvinceName,
        GoodsW: (result[0].GoodsW / result[0].dy) / 1000,
        P1: result[0].P1, 
        P2: result[0].P2, 
        P3: result[0].P3, 
        P4: result[0].P4, 
        P5: result[0].P5, 
        P6: result[0].P6, 
        P7: result[0].P7, 
        P8: result[0].P8, 
        P9: result[0].P9,
        dy: result[0].dy
      }]
    }]
    // j = 0 // pointer ของ output
    for (let i = 1;i < 8;i++) {
      if (result[i].CompanyName === outputs[outputs.length - 1].CompanyName) {
        outputs[outputs.length - 1].totalGw += (result[i].GoodsW / result[i].dy) / 1000
        outputs[outputs.length - 1].totalV += (result[i].P1 + result[i].P2 + result[i].P3 + result[i].P4 + result[i].P5 + result[i].P6 + result[i].P7 + result[i].P8 + result[i].P9)
        outputs[outputs.length - 1].totalDy += result[i].dy
        outputs[outputs.length - 1].Tx.push({
          SrcProvinceName: result[i].SrcProvinceName,
          DstProvinceName: result[i].DstProvinceName,
          GoodsW: (result[i].GoodsW / result[i].dy) / 1000,
          P1: result[i].P1, 
          P2: result[i].P2, 
          P3: result[i].P3, 
          P4: result[i].P4, 
          P5: result[i].P5, 
          P6: result[i].P6, 
          P7: result[i].P7, 
          P8: result[i].P8, 
          P9: result[i].P9,
          dy: result[i].dy
        })
      } else if (result[i].CompanyName !== outputs[outputs.length - 1].CompanyName) {
        outputs.push({
          CompanyName: result[i].CompanyName,
          TransportLicenseID: result[i].TransportLicenseID,
          TransportScope: result[i].TransportScope,
          TransportType: result[i].TransportType,
          totalGw: (result[i].GoodsW / result[i].dy) / 1000,
          totalV: result[i].P1 + result[i].P2 + result[i].P3 + result[i].P4 + result[i].P5 + result[i].P6 + result[i].P7 + result[i].P8 + result[i].P9,
          totalDy: result[i].dy,
          Tx: [{
            SrcProvinceName: result[i].SrcProvinceName,
            DstProvinceName: result[i].DstProvinceName,
            GoodsW: (result[i].GoodsW / result[i].dy) / 1000,
            P1: result[i].P1, 
            P2: result[i].P2, 
            P3: result[i].P3, 
            P4: result[i].P4, 
            P5: result[i].P5, 
            P6: result[i].P6, 
            P7: result[i].P7, 
            P8: result[i].P8, 
            P9: result[i].P9,
            dy: result[i].dy
          }]
        })
      }
    }
  }
  return outputs
}

function getRowSpan1 (row) {
  return row.totalDy + 1
}

function getRowSpanByDy (dy, offset) {
  return dy + offset
}
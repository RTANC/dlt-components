const jsreport = require('jsreport-proxy')
const _ = await jsreport.npm.require('lodash@4.17.15')

function toJSON(data) {
  return JSON.stringify(data);
}

function reportDataFormatter (resp) {
  const maxComId = (_.maxBy(resp,'CompanyID')).CompanyID
  // const maxSrc = (_.maxBy(resp,'SrcProvinceID')).SrcProvinceID
  // const maxDst = (_.maxBy(resp,'DstProvinceID')).DstProvinceID
  let mat = new Array(maxComId).fill(
    new Array(80).fill(
      new Array(80).fill({CompanyName: '', TransportLicenseID: '', TransportType: '', TransportScope: '', GoodsW: 0, P1: 0, P2: 0, P3: 0, P4: 0, P5: 0, P6: 0, P7: 0, P8: 0, P9: 0})
    )
  )
  let result = []
  for (let i = 0;i < resp.length;i++) {
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].CompanyName = resp[i].CompanyName
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].TransportLicenseID = resp[i].TransportLicenseID
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].TransportType = resp[i].TransportType
    mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].TransportScope = resp[i].TransportScope
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
    if (i === (resp.length - 1)) {
      result.push({

      })
    } else if ((resp[i].CompanyID !== resp[i+1].CompanyID)) {
      if (resp[i].SrcProvinceID !== resp[i+1].SrcProvinceID && resp[i].DstProvinceID !== resp[i+1].DstProvinceID){
        result.push({
          CompanyName: resp[i].CompanyName,
          TransportLicenseID: resp[i].TransportLicenseID,
          TransportType: resp[i].TransportType,
          TransportScope: resp[i].TransportScope,
          Tx: [{
            SrcProvinceName: resp[i].SrcProvinceName,
            DstProvinceName: resp[i].DstProvinceName,
            GoodsW: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].GoodsW,
            P1: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P1,
            P2: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P2,
            P3: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P3,
            P4: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P4,
            P5: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P5,
            P6: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P6,
            P7: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P7,
            P8: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P8,
            P9: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P9
          }]
        })
      }
    } else if ((resp[i].CompanyID === resp[i+1].CompanyID)) {
      if (resp[i].SrcProvinceID !== resp[i+1].SrcProvinceID || resp[i].DstProvinceID !== resp[i+1].DstProvinceID) {
        result[(result.length - 1)].Tx.push({
            SrcProvinceName: resp[i].SrcProvinceName,
            DstProvinceName: resp[i].DstProvinceName,
            GoodsW: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].GoodsW,
            P1: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P1,
            P2: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P2,
            P3: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P3,
            P4: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P4,
            P5: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P5,
            P6: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P6,
            P7: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P7,
            P8: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P8,
            P9: mat[resp[i].CompanyID][resp[i].SrcProvinceID][resp[i].DstProvinceID].P9
          })
      }
    }
      // const temp = Object.assign({}, resp[i])
      // let j = i + 1
      // while (j < resp.length && resp[i].CompanyID === resp[j].CompanyID) {
      //     temp.GoodsW += resp[j].GoodsW
      //     temp.P1 += resp[j].P1
      //     temp.P2 += resp[j].P2
      //     temp.P3 += resp[j].P3
      //     temp.P4 += resp[j].P4
      //     temp.P5 += resp[j].P5
      //     temp.P6 += resp[j].P6
      //     temp.P7 += resp[j].P7
      //     temp.P8 += resp[j].P8
      //     temp.P9 += resp[j].P9
      //     j++
      // }
      // i = j
      // result.push(temp)
  }
  return result
}
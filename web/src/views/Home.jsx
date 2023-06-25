import { Container, Grid, Slide, Card, CardContent, Typography, CardActions, Stack, Button, Divider, Box } from '@mui/material'
import React, { useState } from 'react'
import SelectStation from '../components/SelectStation'
import SelectCompany from '../components/SelectCompany'
import DltTextField from '../components/DltTextField'
import DltDateTimePicker from '../components/DltDateTimePicker'
import SelectVehicleClass from '../components/SelectVehicleClass'
import SelectObjective from '../components/SelectObjective'
import SelectProvince from '../components/SelectProvince'
import SelectLPProvince from '../components/SelectLPProvince'
import ImageListLP from '../components/ImageListLP'
import CheckBoxGoodCategory from '../components/CheckBoxGoodCategory'
import formValidator from '../services/validator'
import { SquareEditOutline } from 'mdi-material-ui'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AutoCompleteSearchLP from '../components/AutoCompleteSearchLP'
import AutoCompleteSearchLPOut from '../components/AutoCompleteSearchLPOut'
import BtnSave from '../components/BtnSave'
import BtnClear from '../components/BtnClear'
// import { useSelector } from 'react-redux'
import { getImageURL, handleGoodCategoryCheck, removeSQLTz, SQLDateTimeFormatter } from '../services/utils'
import { createTransport, getTransport, updateTransport } from '../services/transports'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { api } from '../services/api'
import Cookies from 'js-cookie'
import moment from 'moment'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [stationEditable, setStationEditable] = useState(parseInt(Cookies.get('RoleID')) > 1 ? false : true)
  const [companyEditable, setCompanyEditable] = useState(parseInt(Cookies.get('RoleID')) > 2 ? false : true)
  const [images, setImages] = useState(['./Image_Mock.png','./Image_Mock.png','./Image_Mock.png','./Image_Mock.png'])
  const [transport, setTransport] = useState({
    station: {
      value: parseInt(Cookies.get('RoleID')) > 1 ? Cookies.get('StationID') : 1,
      error: false,
      rules: [(v) => !!v || '*ข้อมูลจำเป็น']
    },
    company: {
      value: Cookies.get('CompanyID'),
      error: false,
      rules: [(v) => !!v || '*ข้อมูลจำเป็น']
    },
    manualLP: false,
    f1a: {
      value: '',
      error: false,
      rules: []
    },
    f1apId: {
      value: '',
      error: false,
      rules: []
    },
    r1a: {
      value: '',
      error: false,
      rules: []
    },
    r1apId: {
      value: '',
      error: false,
      rules: []
    },
    timeStampIn: {
      value: null,
      error: false,
      rules: [(v) => !!v || '*ข้อมูลจำเป็น']
    },
    vehicleClass: {
      value: '',
      error: false,
      rules: [(v) => !!v || '*ข้อมูลจำเป็น']
    },
    objective: {
      value: 1,
      error: false,
      rules: [(v) => !!v || '*ข้อมูลจำเป็น']
    },
    isVehicleOut: false,
    mode: 1,
    editLP: false,
    srcProvince: {
      value: ''
    },
    srcGoods: {
      value: ['',false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      get rules () {
        if (!(this.value.every(v => !v))) {
          this.error = false
        } else {
          this.error = '*ข้อมูลจำเป็น'
        }
      },
      error: false
    },
    srcGoodsOther: {
      value: ''
    },
    dstProvince: {
      value: ''
    },
    dstGoods: {
      value: ['',false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      error: false,
      get rules () {
        if (!(this.value.every(v => !v))) {
          this.error = false
        } else {
          this.error = '*ข้อมูลจำเป็น'
        }
      }
    },
    dstGoodsOther: {
      value: ''
    },
    transportId: null,
    vehicleInId: null,
    VehicleOutID: null,
    F2A: null,
    F2APID: null,
    R2A: null,
    R2APID: null,
    TimeStampOut: null,
    isOut: false
  })

  const handleLPSearch = async (e, v) => {
    transport.f1a.value = v.F1A || ''
    transport.f1apId.value = v.F1APID
    transport.r1a.value = v.R1A || ''
    transport.r1apId.value = v.R1APID
    transport.timeStampIn.value = removeSQLTz(v.TimeStampIn)
    transport.transportId = v.TransportID
    transport.vehicleInId = v.VehicleInID
    transport.station.value = v.StationID
    transport.editLP = false
    transport.vehicleClass.value = ''
    transport.mode = 1
    transport.srcProvince.value = ''
    transport.srcGoods.value = ['',false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    transport.srcGoodsOther.value = ''
    transport.dstProvince.value = ''
    transport.dstGoods.value = ['',false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    transport.dstGoodsOther.value = ''

    setImages([getImageURL(v.StationID, v.LaneID, v.TimeStampIn, v.ImageRef, 0),
      getImageURL(v.StationID, v.LaneID, v.TimeStampIn, v.ImageRef, 1),
      getImageURL(v.StationID, v.LaneID, v.TimeStampIn, v.ImageRef, 2),
      getImageURL(v.StationID, v.LaneID, v.TimeStampIn, v.ImageRef, 3)])

    if (v.TransportID !== null) {
      (await getTransport(transport.transportId)).data
    }
    setTransport({...transport})
  }

  const handleLPSearchOut = async (e, v) => {
    transport.VehicleOutID = v.VehicleOutID
    transport.F2A = v.F2A || ''
    transport.F2APID = v.F2APID
    transport.R2A = v.R2A || ''
    transport.R2APID = v.R2APID
    transport.TimeStampOut = removeSQLTz(v.TimeStampOut)
    setTransport({...transport})
  }

  const toggleCarOut = (e) => {
    transport.isOut = !transport.isOut
    transport.VehicleOutID = null
    transport.F2A = ''
    transport.F2APID = null
    transport.R2A = ''
    transport.R2APID = null
    transport.TimeStampOut = null
    setTransport({...transport})
  }

  const handleChangeValue = (e) => {
    transport[e.target.name].value = e.target.value
    setTransport({...transport})
  }

  const handleRxGoodCategory = (e) => {
    if (parseInt(e.target.name) === 0) {
      transport.srcGoods.value[0] = e.target.value
    } else {
      transport.srcGoods.value[parseInt(e.target.name)] = e.target.checked
    }

    if (transport.srcGoods.value[14] === false) {
      transport.srcGoods.value[0] = ''
    }
    setTransport({...transport})
  }

  const handleTxGoodCategory = (e) => {
    if (parseInt(e.target.name) === 0) {
      transport.dstGoods.value[0] = e.target.value
    } else {
      transport.dstGoods.value[parseInt(e.target.name)] = e.target.checked
    }

    if (transport.dstGoods.value[14] === false) {
      transport.dstGoods.value[0] = ''
    }

    setTransport({...transport})
  }

  const toggleMode = (m) => {
    if (m === 1) { // เคลียร์ chackbox ของ mode ที่ไม่ได้เลือก
      transport.dstGoods.value = ['',false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    } else if (m === 2) {
      transport.srcGoods.value = ['',false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    }
    transport.mode = m
    setTransport({...transport})
  }

  const save = async (e) => {
    try {
      setLoading(true)
      if (formValidator(transport, setTransport)) {
        const payload = { StationID: transport.station.value,
          CompanyID: transport.company.value,
          ObjectiveID: transport.objective.value,
          SrcProvinceID: transport.srcProvince.value || 'NULL',
          SrcGoods: handleGoodCategoryCheck(transport.srcGoods.value),
          SrcGoodsOther: transport.srcGoods.value[0],
          DstProvinceID: transport.dstProvince.value || 'NULL',
          DstGoods: handleGoodCategoryCheck(transport.dstGoods.value),
          DstGoodsOther: transport.dstGoods.value[0],
          VehicleInID: transport.vehicleInId,
          TimeStampIn: SQLDateTimeFormatter(transport.timeStampIn.value),
          F1M: transport.f1a.value,
          F1MPID: transport.f1apId.value,
          R1M: transport.r1a.value,
          R1MPID: transport.r1apId.value,
          manualLP: transport.manualLP,
          editLP: transport.editLP,
          VehicleClassID: transport.vehicleClass.value,
          VehicleOutID: transport.VehicleOutID,
          TimeStampOut: (moment(transport.TimeStampOut).isValid()) ? SQLDateTimeFormatter(transport.TimeStampOut) : null }
        if (transport.transportId === null) {
          await createTransport(payload)
        } else {
          await updateTransport(transport.transportId, payload)
        }
        clear()
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'บันทึกข้อมูลสำเร็จ'
        })
      } else {
        Swal.fire({
          icon: 'info',
          title: 'กรอกข้อมูลไม่ครบถ้วน',
          text: 'กรุณากรอกข้อมูลให้ครบถ้วน แล้วลองใหม่อีกครั้ง'
        })
      }
      // console.log(transport)
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'ผิดพลาด',
        text: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  // const usr = useSelector((state) => state.login)
  const clear = () => {
    transport.company.error = false
    transport.manualLP = false
    transport.f1a.value = ''
    transport.f1apId.value = ''
    transport.r1a.value = ''
    transport.r1apId.value = ''
    transport.timeStampIn.value = ''
    transport.vehicleClass.value = ''
    transport.objective.value = 1
    transport.mode = 1
    transport.editLP = false
    transport.srcProvince.value = ''
    transport.srcGoods.value = ['',false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    transport.srcGoodsOther.value = ''
    transport.dstProvince.value = ''
    transport.dstGoods.value = ['',false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    transport.dstGoodsOther.value = ''
    transport.vehicleInId = null
    transport.transportId = null
    transport.VehicleOutID = null
    transport.F2A = ''
    transport.F2APID = null
    transport.R2A = ''
    transport.R2APID = null
    transport.TimeStampOut = null
    transport.isOut = false
    setImages(['/Image_Mock.png','/Image_Mock.png','/Image_Mock.png','/Image_Mock.png'])
    setTransport({...transport})
  }

  const toggleEdit = () => {
    transport.editLP = !transport.editLP
    setTransport({...transport})
  }

  const toggleManualLP = () => {
    transport.manualLP = !transport.manualLP
    setTransport({...transport})
  }

  useEffect(() => {
    api.defaults.headers.common['Authorization'] = "Bearer " + Cookies.get('token')
  }, [])
  

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
    <Container>
      <Stack spacing={2}>
        <div className='dlt-page-title'>
          <div className='dlt-page-title-text-s'>บันทึกข้อมูลรับส่งสินค้า</div>
          <div className='dlt-page-title-line'></div>
        </div>
        <Card>
          <CardContent>
            <Grid container spacing={2} direction='row' wrap='wrap'>
              <Grid item xs={12} sm={6} md={6}>
                <SelectStation value={transport.station.value} name='station' onChange={handleChangeValue} disabled={!stationEditable} required error={transport.station.error}></SelectStation>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SelectCompany value={transport.company.value} name='company' onChange={handleChangeValue} disabled={!companyEditable} station={transport.station.value} required error={transport.company.error}></SelectCompany>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={2} direction='row' wrap='wrap'>
              <Grid item xs={12}>
                <AutoCompleteSearchLP station={transport.station.value} name='lpNumber' onChange={handleLPSearch}></AutoCompleteSearchLP>
              </Grid>
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                <Button onClick={toggleManualLP} variant='contained' color='warning' sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 24, height: 48, background: 'linear-gradient(102.79deg, #F3B922 0%, #A37A10 98.65%)', borderRadius: 3}}>กรอกข้อมูลด้วยตนเอง</Button>
              </Grid>
            </Grid>
          </CardContent>
          {(!!transport.vehicleInId || transport.manualLP) && <CardContent>
            <Grid container spacing={2} direction='row' wrap='wrap'>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h5" sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 36, color: 'white'}}>ข้อมูลรถบรรทุก</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={{display: 'flex', justifyContent: 'end'}}>
                <Button variant='contained' startIcon={<SquareEditOutline/>} onClick={toggleEdit} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 22, height: 44, background: 'linear-gradient(102.79deg, #2283F3 0%, #184C88 98.65%)', borderRadius: 3}}>บันทึกเอง/แก้ไข</Button>
              </Grid>
              <Grid item xs={12}>
                <DltDateTimePicker value={transport.timeStampIn.value} label='วัน เวลา ที่รถเข้า' name='timeStampIn' onChange={(v) => {transport.timeStampIn.value = v; setTransport({...transport})}} required error={transport.timeStampIn.error}></DltDateTimePicker>
              </Grid>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <Grid item xs={6}><DltTextField label='ทะเบียนหน้า-อัตโนมัติ' name='f1a' value={transport.f1a.value} readOnly={!transport.editLP} onChange={handleChangeValue}></DltTextField></Grid>
              <Grid item xs={6}><DltTextField label='ทะเบียนหลัง-อัตโนมัติ' name='r1a' value={transport.r1a.value} readOnly={!transport.editLP} onChange={handleChangeValue}></DltTextField></Grid>
              <Grid item xs={6}><SelectLPProvince label='จังหวัด' name='f1apId' value={transport.f1apId.value} disabled={!transport.editLP} onChange={handleChangeValue} required error={transport.f1apId.error}></SelectLPProvince></Grid>
              <Grid item xs={6}><SelectLPProvince label='จังหวัด' name='r1apId' value={transport.r1apId.value} disabled={!transport.editLP} onChange={handleChangeValue} required error={transport.r1apId.error}></SelectLPProvince></Grid>
              <Grid item xs={12}>
                <ImageListLP images={images}></ImageListLP>
              </Grid>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <Grid item xs={6}><SelectVehicleClass value={transport.vehicleClass.value} name='vehicleClass' onChange={handleChangeValue} required error={transport.vehicleClass.error}></SelectVehicleClass></Grid>
              <Grid item xs={6}><SelectObjective value={transport.objective.value} name='objective' onChange={handleChangeValue} required error={transport.objective.error}></SelectObjective></Grid>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12}  sx={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" color="error" onClick={toggleCarOut} endIcon={<LocalShippingIcon/>} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 24, height: 48, background: 'linear-gradient(102.79deg, #F15353 0%, #A31212 98.65%)', borderRadius: 3}}>
                  รถออกจากสถานี
                </Button>
              </Grid>
              {transport.isOut && <React.Fragment><Grid item xs={12}>
                <AutoCompleteSearchLPOut station={transport.station.value} timeStampIn={transport.timeStampIn.value} name='lpNumberOut' onChange={handleLPSearchOut} inputValue={transport.f1a.value.trim() || transport.r1a.value.trim()}></AutoCompleteSearchLPOut>
              </Grid>
              <Grid item xs={6}><DltTextField label='ทะเบียนหน้า-อัตโนมัติ' name='F2A' value={transport.F2A} readOnly></DltTextField></Grid>
              <Grid item xs={6}><DltTextField label='ทะเบียนหลัง-อัตโนมัติ' name='R2A' value={transport.R2A} readOnly></DltTextField></Grid>
              <Grid item xs={6}><SelectLPProvince label='จังหวัด' name='F2APID' value={transport.F2APID} disabled></SelectLPProvince></Grid>
              <Grid item xs={6}><SelectLPProvince label='จังหวัด' name='R2APID' value={transport.R2APID} disabled></SelectLPProvince></Grid>
              <Grid item xs={12}>
                <DltDateTimePicker value={transport.TimeStampOut} label='วัน เวลา ที่รถออก' name='TimeStampOut' readOnly></DltDateTimePicker>
              </Grid></React.Fragment>}
            </Grid>
          </CardContent>}
        </Card>
        {((!!transport.vehicleInId || transport.manualLP) && transport.objective.value === 1) && <Card>
          <CardContent>
            <Grid container spacing={2} direction='row' wrap='wrap'>
              <Grid item xs={12} sm={4} md={4}>
                <Button onClick={() => toggleMode(1)} fullWidth sx={{backgroundImage: 'url(./Button-Transit-In.png);', height: 135, borderRadius: '12px', backgroundSize: '100% 135px'}}></Button>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Button onClick={() => toggleMode(3)} fullWidth sx={{backgroundImage: 'url(./Button-Transit-2-Way.png);', height: 135, borderRadius: '12px', backgroundSize: '100% 135px'}}></Button>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Button onClick={() => toggleMode(2)} fullWidth sx={{backgroundImage: 'url(./Button-Transit-Out.png);', height: 135, borderRadius: '12px', backgroundSize: '100% 135px'}}></Button>
              </Grid>
              {transport.mode !== 2 && <Grid item xs={12} sm={12} md={transport.mode === 1 ? 12 : 6 }>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12}><Typography variant='h5' sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 36, color: 'white'}}>ส่งสินค้าเข้าสถานี</Typography></Grid>
                  <Grid item xs={(transport.mode !== 3) ? 6 : 12}>
                    <SelectProvince value={transport.srcProvince.value} name='srcProvince' label='จังหวัดต้นทาง' onChange={handleChangeValue}></SelectProvince>
                  </Grid>
                  <Grid item xs={(transport.mode !== 3) ? 6 : 12}>
                    <SelectStation value={transport.station.value} readonly></SelectStation>
                  </Grid>
                  <Grid item xs={12}>
                    <CheckBoxGoodCategory value={transport.srcGoods.value} onChange={handleRxGoodCategory} required error={transport.srcGoods.error} xs={(transport.mode !== 3) ? 6 : 12}></CheckBoxGoodCategory>
                  </Grid>
                </Grid>
              </Grid>}
              {(transport.mode !== 1) && <Grid item xs={12} sm={12} md={transport.mode === 2 ? 12 : 6 }>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12}><Typography variant='h5' sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 36, color: 'white'}}>รับสินค้าออกจากสถานี</Typography></Grid>
                  <Grid item xs={(transport.mode !== 3) ? 6 : 12}>
                    <SelectStation value={transport.station.value} readonly></SelectStation>
                  </Grid>
                  <Grid item xs={(transport.mode !== 3) ? 6 : 12}>
                  <SelectProvince value={transport.dstProvince.value} name='dstProvince' label='จังหวัดปลายทาง' onChange={handleChangeValue}></SelectProvince>
                  </Grid>
                  <Grid item xs={12}>
                    <CheckBoxGoodCategory value={transport.dstGoods.value} onChange={handleTxGoodCategory} required error={transport.dstGoods.error} xs={(transport.mode !== 3) ? 6 : 12}></CheckBoxGoodCategory>
                  </Grid>
                </Grid>
              </Grid>}
            </Grid>
          </CardContent>
        </Card>}
        {(!!transport.vehicleInId || transport.manualLP) && <Card>
          <CardActions>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', py: 2}}>
              <BtnClear loading={loading} onClick={clear}></BtnClear>
              <BtnSave loading={loading} onClick={save}></BtnSave>
            </Box>
          </CardActions>
        </Card>}
      </Stack>
    </Container>
    </Slide>
  )
}

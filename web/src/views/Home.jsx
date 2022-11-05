import { Container, Grid, Slide, Card, CardContent, Typography, Box, ToggleButtonGroup, ToggleButton, CardActions, CardHeader, Stack, Button, Divider } from '@mui/material'
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
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import CheckBoxGoodCategory from '../components/CheckBoxGoodCategory'
import formValidator from '../services/validator'
import { SquareEditOutline } from 'mdi-material-ui'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AutoCompleteSearchLP from '../components/AutoCompleteSearchLP'
import BtnSave from '../components/BtnSave'
import BtnClear from '../components/BtnClear'
import { useSelector } from 'react-redux'
import { getImageURL, removeSQLTz } from '../services/utils'
import { createTransport, getTransport, updateTransport } from '../services/transports'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState(['/static/Image_Mock.png','/static/Image_Mock.png','/static/Image_Mock.png','/static/Image_Mock.png'])
  const [edit, setEdit] = useState(false)
  const [transport, setTransport] = useState({
    station: {
      value: 1,
      error: false,
      rules: [(v) => !!v || '*ข้อมูลจำเป็น']
    },
    company: {
      value: 189,
      error: false,
      rules: [(v) => !!v || '*ข้อมูลจำเป็น']
    },
    isManualAddLPR: false,
    editLPR: false,
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
    vehicleInId: null
  })

  const handleLPSearch = async (e, v) => {
    console.log(v)
    transport.f1a.value = v.F1A
    transport.f1apId.value = v.F1APID
    transport.r1a.value = v.R1A
    transport.r1apId.value = v.R1APID
    transport.timeStampIn.value = removeSQLTz(v.TimeStampIn)
    transport.transportId = v.TransportID
    transport.vehicleInId = v.VehicleInID
    transport.station.value = v.StationID

    setImages([getImageURL(v.StationID, v.LaneID, v.TimeStampIn, v.ImageRef, 0),
      getImageURL(v.StationID, v.LaneID, v.TimeStampIn, v.ImageRef, 1),
      getImageURL(v.StationID, v.LaneID, v.TimeStampIn, v.ImageRef, 2),
      getImageURL(v.StationID, v.LaneID, v.TimeStampIn, v.ImageRef, 3)])

    if (v.TransportID !== null) {
      (await getTransport(transport.transportId)).data
    }
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

  const save = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      if (formValidator(transport, setTransport)) {
        const payload = { StationID: transport.station.value,
          CompanyID: transport.company.value,
          ObjectiveID: transport.objective.value,
          SrcProvinceID: transport.srcProvince.value,
          SrcGoods: 0,
          SrcGoodsOther: '',
          DstProvinceID: transport.dstProvince.value,
          DstGoods: 0,
          DstGoodsOther: '',
          VehicleInID: transport.vehicleInId,
          TimeStampIn: transport.timeStampIn.value,
          F1M: transport.f1a.value,
          F1MPID: transport.f1apId.value,
          R1M: transport.r1a.value,
          R1MPID: transport.r1apId.value,
          VehicleClassID: transport.vehicleClass.value }
        if (transport.transportId === null) {
          await createTransport(payload)
        } else {
          await updateTransport(transport.transportId, payload)
        }
      }
      console.log(transport)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const usr = useSelector((state) => state.login)
  const cancel = () => {
    console.log(usr)
  }

  const toggleEdit = () => {
    setEdit(!edit)
  }

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
    <Container>
      <Stack spacing={2}>
        <div className='dlt-page-title'>
          <div className='dlt-page-title-text'>บันทึกข้อมูลรับส่งสินค้า</div>
          <div className='dlt-page-title-line'></div>
        </div>
        <Card>
          <CardContent>
            <Grid container spacing={2} direction='row' wrap='wrap'>
              <Grid item xs={12} sm={6} md={6}>
                <SelectStation value={transport.station.value} name='station' onChange={handleChangeValue} required error={transport.station.error}></SelectStation>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SelectCompany value={transport.company.value} name='company' onChange={handleChangeValue} station={transport.station.value} required error={transport.company.error}></SelectCompany>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={2} direction='row' wrap='wrap'>
              <Grid item xs={12}>
                <AutoCompleteSearchLP station={2} name='lpNumber' onChange={handleLPSearch}></AutoCompleteSearchLP>
              </Grid>
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                <Button variant='contained' color='warning' sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 24, height: 48, background: 'linear-gradient(102.79deg, #F3B922 0%, #A37A10 98.65%)', borderRadius: 3}}>กรอกข้อมูลด้วยตนเอง</Button>
              </Grid>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container spacing={2} direction='row' wrap='wrap'>
              <Grid item xs={6}>
                <Typography variant="h5" sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 36, color: 'white'}}>ข้อมูลรถบรรทุก</Typography>
              </Grid>
              <Grid item xs={6} sx={{display: 'flex', justifyContent: 'end'}}>
                <Button variant='contained' startIcon={<SquareEditOutline/>} onClick={toggleEdit} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 24, height: 48, background: 'linear-gradient(102.79deg, #2283F3 0%, #184C88 98.65%)', borderRadius: 3}}>แก้ไขข้อมูล</Button>
              </Grid>
              <Grid item xs={12}>
                <DltDateTimePicker value={transport.timeStampIn.value} label='วัน เวลา ที่รถเข้า' name='timeStampIn' onChange={(v) => {transport.timeStampIn.value = v; setTransport({...transport})}} required error={transport.timeStampIn.error}></DltDateTimePicker>
              </Grid>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <Grid item xs={6}><DltTextField label='ทะเบียนหน้า-อัตโนมัติ' name='f1a' value={transport.f1a.value} readOnly={!edit} onChange={handleChangeValue}></DltTextField></Grid>
              <Grid item xs={6}><DltTextField label='ทะเบียนหลัง-อัตโนมัติ' name='r1a' value={transport.r1a.value} readOnly={!edit} onChange={handleChangeValue}></DltTextField></Grid>
              <Grid item xs={6}><SelectLPProvince label='จังหวัด' name='f1apId' value={transport.f1apId.value} onChange={handleChangeValue} required error={transport.f1apId.error}></SelectLPProvince></Grid>
              <Grid item xs={6}><SelectLPProvince label='จังหวัด' name='r1apId' value={transport.r1apId.value} onChange={handleChangeValue} required error={transport.r1apId.error}></SelectLPProvince></Grid>
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
                <Button variant="contained" color="error" endIcon={<LocalShippingIcon/>} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 24, height: 48, background: 'linear-gradient(102.79deg, #F15353 0%, #A31212 98.65%)', borderRadius: 3}}>
                  รถออกจากสถานนี
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={2} direction='row' wrap='wrap'>
              <Grid item xs={12}>
                <ToggleButtonGroup color='primary' value={transport.mode} exclusive onChange={(e, val) => { setTransport({...transport, 'mode': val}) }} fullWidth>
                  <ToggleButton value={1}><ArrowCircleDownIcon sx={{mr: 1}}/> ส่งสินค้าเข้า</ToggleButton>
                  <ToggleButton value={3}><ArrowCircleDownIcon/> <ArrowCircleUpIcon sx={{mr: 1}}/> ส่งและรับสินค้า</ToggleButton>
                  <ToggleButton value={2}><ArrowCircleUpIcon sx={{mr: 1}}/> รับสินค้าออก</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              {transport.mode !== 2 && <Grid item xs={12} sm={12} md={transport.mode === 1 ? 12 : 6 }>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12}><Typography variant='h5' sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 36, color: 'white'}}>ส่งสินค้าเข้าสถานนี</Typography></Grid>
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
        </Card>
        <Card>
          <CardActions sx={{display: 'flex', justifyContent: 'center', py: 2}}>
            <BtnClear loading={loading} onClick={cancel}></BtnClear>
            <BtnSave loading={loading} onClick={save}></BtnSave>
          </CardActions>
        </Card>
      </Stack>
    </Container>
    </Slide>
  )
}

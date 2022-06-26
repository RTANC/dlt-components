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
import moment from 'moment-timezone'
import ImageListLP from '../components/ImageListLP'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckBoxGoodCategory from '../components/CheckBoxGoodCategory'
import { LoadingButton } from '@mui/lab'
import formValidator from '../services/validator'
import { SquareEditOutline } from 'mdi-material-ui'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AutoCompleteSearchLP from '../components/AutoCompleteSearchLP'

export default function Home() {
  
  const [loading, setLoading] = useState(false)
  const [transport, setTransport] = useState({
    station: {
      value: 1,
      error: false,
      rules: []
    },
    company: {
      value: 189,
      error: false,
      rules: []
    },
    lpNumber: {
      value: ''
    },
    isManualAddLPR: false,
    f1a: '',
    r1a: '',
    editLPR: false,
    f1mp1: {
      value: '',
      error: false,
      rules: []
    },
    f1mp2: {
      value: '',
      error: false,
      rules: []
    },
    f1mpId: {
      value: '',
      error: false,
      rules: []
    },
    r1mp1: {
      value: '',
      error: false,
      rules: []
    },
    r1mp2: {
      value: '',
      error: false,
      rules: []
    },
    r1mpId: {
      value: '',
      error: false,
      rules: []
    },
    timeStampIn: {
      value: null,
      error: false,
      rules: []
    },
    vehicleClass: {
      value: '',
      error: false,
      rules: []
    },
    objective: {
      value: 1,
      error: false,
      rules: []
    },
    isVehicleOut: false,
    mode: 1,
    rx: {
      province: '',
      goods: ['',false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      other: '',
      rules: [],
      error: false
    },
    tx: {
      province: '',
      goods: ['',false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      other: '',
      rules: [],
      error: false
    }
  })

  transport.station.rules = [(v) => !!v || '*ข้อมูลจำเป็น']
  transport.company.rules = [(v) => !!v || '*ข้อมูลจำเป็น']
  transport.timeStampIn.rules = [(v) => !!v || '*ข้อมูลจำเป็น']
  transport.vehicleClass.rules = [(v) => !!v || '*ข้อมูลจำเป็น']
  transport.objective.rules = [(v) => !!v || '*ข้อมูลจำเป็น']
  switch (transport.mode) {
    case 1: transport.rx.rules = [!(transport.rx.goods.every(v => !v)) || '*ข้อมูลจำเป็น']
    break
    case 2: transport.tx.rules = [!(transport.tx.goods.every(v => !v)) || '*ข้อมูลจำเป็น']
    break
    default: transport.rx.rules = [!(transport.rx.goods.every(v => !v)) || '*ข้อมูลจำเป็น']
    transport.tx.rules = [!(transport.tx.goods.every(v => !v)) || '*ข้อมูลจำเป็น']
  }

  const handleRxGoodCategory = (e) => {
    if (parseInt(e.target.name) === 0) {
      transport.rx.goods[0] = e.target.value
    } else {
      transport.rx.goods[parseInt(e.target.name)] = e.target.checked
    }

    if (transport.rx.goods[14] === false) {
      transport.rx.goods[0] = ''
    }

    if (transport.mode !== 2) {
      transport.rx.rules = [!(transport.rx.goods.every(v => !v)) || '*ข้อมูลจำเป็น']
    } else {
      transport.rx.rules = []
      transport.rx.error = false
    }
    setTransport({...transport, rx: {...transport.rx}})
  }

  const handleTxGoodCategory = (e) => {
    if (parseInt(e.target.name) === 0) {
      transport.tx.goods[0] = e.target.value
    } else {
      transport.tx.goods[parseInt(e.target.name)] = e.target.checked
    }

    if (transport.tx.goods[14] === false) {
      transport.tx.goods[0] = ''
    }

    if (transport.mode !== 1) {
      transport.tx.rules = [!(transport.tx.goods.every(v => !v)) || '*ข้อมูลจำเป็น']
    } else {
      transport.tx.rules = []
      transport.tx.error = false
    }
    setTransport({...transport, tx: {...transport.tx}})
  }

  const submit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      if (formValidator(transport, setTransport)) {

      }
      console.log(transport)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const cancel = () => {

  }

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
    <Container>
      <Stack spacing={2}>
        <Card>
          <CardHeader title="บันทึกข้อมูลรับส่งสินค้า" titleTypographyProps={{variant: 'h5', align: 'center'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
          <CardContent>
            <Grid container spacing={2} direction='row' wrap='wrap'>
              <Grid item xs={12} sm={6} md={6}>
                <SelectStation value={transport.station.value} name='station' onChange={(e) => {setTransport({...transport,'station': {...transport.station, 'value': e.target.value}})}} required error={transport.station.error}></SelectStation>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SelectCompany value={transport.company.value} name='company' onChange={(e) => {setTransport({...transport,'company': {...transport.company, 'value': e.target.value}})}} required error={transport.company.error}></SelectCompany>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={2} direction='row' wrap='wrap'>
              <Grid item xs={12}>
                <AutoCompleteSearchLP value={transport.lpNumber.value} name='lpNumber'></AutoCompleteSearchLP>
              </Grid>
              <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                <Button variant='contained' color='warning'>กรอกข้อมูลด้วยตนเอง</Button>
              </Grid>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Grid container spacing={2} direction='row' wrap='wrap'>
              <Grid item xs={6}>
                <Typography variant="h5">ข้อมูลรถบรรทุก</Typography>
              </Grid>
              <Grid item xs={6} sx={{display: 'flex', justifyContent: 'end'}}>
                <Button variant='contained' startIcon={<SquareEditOutline/>}>แก้ไขข้อมูล</Button>
              </Grid>
              <Grid item xs={12}>
                <DltDateTimePicker disabled value={transport.timeStampIn.value} label='วัน เวลา ที่รถเข้า' name='timeStampIn' required error={transport.timeStampIn.error}></DltDateTimePicker>
              </Grid>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <Grid item xs={6}><DltTextField label='ทะเบียนหน้า-อัตโนมัติ' value={transport.f1a} disabled></DltTextField></Grid>
              <Grid item xs={6}><DltTextField label='ทะเบียนหลัง-อัตโนมัติ' value={transport.f1a} disabled></DltTextField></Grid>
              <Grid item xs={6}><SelectLPProvince label='จังหวัด' value={transport.f1mpId.value} onChange={(e) => {setTransport({...transport, f1mpId: {...transport.f1mpId, value: e.target.value}})}} required error={transport.f1mpId.error}></SelectLPProvince></Grid>
              <Grid item xs={6}><SelectLPProvince label='จังหวัด' value={transport.r1mpId.value} onChange={(e) => {setTransport({...transport, r1mpId: {...transport.r1mpId, value: e.target.value}})}} required error={transport.r1mpId.error}></SelectLPProvince></Grid>
              <Grid item xs={12}>
                <ImageListLP></ImageListLP>
              </Grid>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <Grid item xs={6}><SelectVehicleClass value={transport.vehicleClass.value} name='vehicleClass' onChange={(e) => {setTransport({...transport, 'vehicleClass': {...transport.vehicleClass, 'value': e.target.value}})}} required error={transport.vehicleClass.error}></SelectVehicleClass></Grid>
              <Grid item xs={6}><SelectObjective value={transport.objective.value} name='objective' onChange={(e) => {setTransport({...transport, 'objective': {...transport.objective, 'value': e.target.value}})}} required error={transport.objective.error}></SelectObjective></Grid>
              <Grid item xs={12}>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12}  sx={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" color="error" endIcon={<LocalShippingIcon/>}>
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
                  <ToggleButton value={3}><ArrowCircleDownIcon/> <ArrowCircleUpIcon sx={{mr: 1}}/> ส่งและสินค้า</ToggleButton>
                  <ToggleButton value={2}><ArrowCircleUpIcon sx={{mr: 1}}/> รับสินค้าออก</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              {transport.mode !== 2 && <Grid item xs={12} sm={12} md={transport.mode === 1 ? 12 : 6 }>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12}><Typography variant='h5'>ส่งสินค้าเข้าสถานนี</Typography></Grid>
                  <Grid item xs={6}>
                    <SelectProvince value={transport.rx.province} name='rxProvince' label='จังหวัดต้นทาง' onChange={(e) => {setTransport({...transport, rx: {...transport.rx, province: e.target.value}})}}></SelectProvince>
                  </Grid>
                  <Grid item xs={6}>
                    <SelectStation value={transport.station.value} readonly></SelectStation>
                  </Grid>
                  <Grid item xs={12}>
                    <CheckBoxGoodCategory value={transport.rx.goods} onChange={handleRxGoodCategory} required error={transport.rx.error}></CheckBoxGoodCategory>
                  </Grid>
                </Grid>
              </Grid>}
              {(transport.mode !== 1) && <Grid item xs={12} sm={12} md={transport.mode === 2 ? 12 : 6 }>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12}><Typography variant='h5'>รับสินค้าออกจากสถานี</Typography></Grid>
                  <Grid item xs={6}>
                    <SelectStation value={transport.station.value} readonly></SelectStation>
                  </Grid>
                  <Grid item xs={6}>
                  <SelectProvince value={transport.tx.province} name='txProvince' label='จังหวัดปลายทาง' onChange={(e) => {setTransport({...transport, tx: {...transport.tx, province: e.target.value}})}}></SelectProvince>
                  </Grid>
                  <Grid item xs={12}>
                    <CheckBoxGoodCategory value={transport.tx.goods} onChange={handleTxGoodCategory} required error={transport.tx.error}></CheckBoxGoodCategory>
                  </Grid>
                </Grid>
              </Grid>}
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
            <LoadingButton loading={loading} sx={{mx: 1}} color='primary' variant='contained' onClick={submit} startIcon={<SaveIcon></SaveIcon>}>บันทึก</LoadingButton>
            <LoadingButton loading={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={cancel} startIcon={<CancelIcon></CancelIcon>}>ยกเลิก</LoadingButton>
          </CardActions>
        </Card>
      </Stack>
    </Container>
    </Slide>
  )
}

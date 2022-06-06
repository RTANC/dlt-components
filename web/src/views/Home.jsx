import { Container, Grid, Slide, Card, CardContent, Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material'
import React, { useState } from 'react'
import SelectStation from '../components/SelectStation'
import SelectCompany from '../components/SelectCompany'
import DltTextField from '../components/DltTextField'
import CheckBoxManualAddLPR from '../components/CheckBoxManualAddLPR'
import DltDateTimePicker from '../components/DltDateTimePicker'
import SelectVehicleClass from '../components/SelectVehicleClass'
import SelectObjective from '../components/SelectObjective'
import CheckBoxVehicleOut from '../components/CheckBoxVehicleOut'
import CheckBoxEditLPR from '../components/CheckBoxEditLPR'
import SelectProvince from '../components/SelectProvince'
import SelectLPProvince from '../components/SelectLPProvince'
import moment from 'moment-timezone'
import ImageListLP from '../components/ImageListLP'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import CheckBoxGoodCategory from '../components/CheckBoxGoodCategory'


export default function Home() {
  const [transport, setTransport] = useState({
    station: {
      value: 1,
      error: false,
      rules: []
    },
    company: {
      value: 191,
      error: false,
      rules: []
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
    mode: 3,
    rx: {
      province: '',
      goods: ['',false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      other: ''
    }
  })

  transport.station.rules = [transport.station.value !== '' || '*ข้อมูลจำเป็น']
  transport.company.rules = [transport.company.value !== '' || '*ข้อมูลจำเป็น']
  transport.timeStampIn.rules = [transport.timeStampIn.value !== null || '*ข้อมูลจำเป็น']
  transport.vehicleClass.rules = [transport.vehicleClass.value !== '' || '*ข้อมูลจำเป็น']
  transport.objective.rules = [transport.objective.value !== '' || '*ข้อมูลจำเป็น']

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
    <Container maxWidth="false">
      <Grid
        container
        spacing={1}
        direction="row"
        wrap="wrap"
      >
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{backgroundColor: '#eeeeee'}}>
            <Typography variant="h6" align="left" >
              ข้อมูลผู้บันทึก
            </Typography>
            </CardContent>
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
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{backgroundColor: '#eeeeee'}}>
              <Typography variant="h6" align="left" >
                ข้อมูลรถบรรทุก
              </Typography>
            </CardContent>
            <CardContent>
              <Grid container spacing={2} direction='row' wrap='wrap'>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Grid container spacing={2} direction='row' wrap='wrap'>
                    <Grid item xs={9}>
                      <DltTextField label='ค้นหาจากเลขทะเบียน'></DltTextField>
                    </Grid>
                    <Grid item xs={3}>
                      <CheckBoxManualAddLPR value={transport.isManualAddLPR} onChange={(e) => {setTransport({...transport, 'isManualAddLPR': e.target.checked })}}></CheckBoxManualAddLPR>
                    </Grid>
                    <Grid item xs={9}><DltTextField label='ทะเบียนหน้า-อัตโนมัติ' value={transport.f1a} disabled></DltTextField></Grid>
                    <Grid item xs={9}><DltTextField label='ทะเบียนหลัง-อัตโนมัติ' value={transport.f1a} disabled></DltTextField></Grid>
                    <Grid item xs={9}><CheckBoxEditLPR value={transport.editLPR} onChange={(e) => {setTransport({...transport, editLPR: e.target.checked})}}></CheckBoxEditLPR></Grid>
                    <Grid item xs={4}><DltTextField label='ทะเบียนหน้า-แก้ไข' value={transport.f1mp1.value} onChange={(e) => {setTransport({...transport, f1mp1: {...transport.f1mp1, value: e.target.value}})}} required error={transport.f1mp1.error}></DltTextField></Grid>
                    <Grid item xs={4}><DltTextField label='ทะเบียนหน้า-แก้ไข' value={transport.f1mp2.value} onChange={(e) => {setTransport({...transport, f1mp2: {...transport.f1mp2, value: e.target.value}})}} required error={transport.f1mp2.error}></DltTextField></Grid>
                    <Grid item xs={4}><SelectLPProvince label='ทะเบียนหน้า-แก้ไข (จังหวัด)' value={transport.f1mpId.value} onChange={(e) => {setTransport({...transport, f1mpId: {...transport.f1mpId, value: e.target.value}})}} required error={transport.f1mpId.error}></SelectLPProvince></Grid>
                    <Grid item xs={4}><DltTextField label='ทะเบียนหลัง-แก้ไข' value={transport.r1mp1.value} onChange={(e) => {setTransport({...transport, r1mp1: {...transport.r1mp1, value: e.target.value}})}} required error={transport.r1mp1.error}></DltTextField></Grid>
                    <Grid item xs={4}><DltTextField label='ทะเบียนหลัง-แก้ไข' value={transport.r1mp2.value} onChange={(e) => {setTransport({...transport, r1mp2: {...transport.r1mp2, value: e.target.value}})}} required error={transport.r1mp2.error}></DltTextField></Grid>
                    <Grid item xs={4}><SelectLPProvince label='ทะเบียนหลัง-แก้ไข (จังหวัด)' value={transport.r1mpId.value} onChange={(e) => {setTransport({...transport, r1mpId: {...transport.r1mpId, value: e.target.value}})}} required error={transport.r1mpId.error}></SelectLPProvince></Grid>
                    <Grid item xs={9}>
                      <DltDateTimePicker disabled value={transport.timeStampIn.value} label='วัน/เดือน/ปี ขาเข้า' name='timeStampIn' required error={transport.timeStampIn.error}></DltDateTimePicker>
                    </Grid>
                    <Grid item xs={9}>
                      <SelectVehicleClass value={transport.vehicleClass.value} name='vehicleClass' onChange={(e) => {setTransport({...transport, 'vehicleClass': {...transport.vehicleClass, 'value': e.target.value}})}} required error={transport.vehicleClass.error}></SelectVehicleClass>
                    </Grid>
                    <Grid item xs={9}>
                      <SelectObjective value={transport.objective.value} name='objective' onChange={(e) => {setTransport({...transport, 'objective': {...transport.objective, 'value': e.target.value}})}} required error={transport.objective.error}></SelectObjective>
                    </Grid>
                    <Grid item xs={9}>
                      <CheckBoxVehicleOut value={transport.isVehicleOut} onChange={(e) => {setTransport({...transport, 'isVehicleOut': e.target.checked})}}></CheckBoxVehicleOut>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <ImageListLP></ImageListLP>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
        <Card>
            <CardContent sx={{backgroundColor: '#eeeeee'}}>
              <Typography variant="h6" align="left" >
                สินค้า
              </Typography>
            </CardContent>
            <CardContent>
              <Grid container spacing={2} direction='row' wrap='wrap' >
                <Grid item xs={12}>
                  <ToggleButtonGroup color='primary' value={transport.mode} exclusive onChange={(e, val) => { setTransport({...transport, 'mode': val}) }} fullWidth>
                    <ToggleButton value={1}><ArrowCircleDownIcon sx={{mr: 1}}/> ส่งสินค้าเข้า</ToggleButton>
                    <ToggleButton value={2}><ArrowCircleUpIcon sx={{mr: 1}}/> รับสินค้าออก</ToggleButton>
                    <ToggleButton value={3}><ArrowCircleDownIcon/> <ArrowCircleUpIcon sx={{mr: 1}}/> รับและส่งสินค้าสถานี</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2} direction='row' wrap='wrap'>
                    <Grid item xs={12}>
                      <Typography variant='subtitle1' align='left' color='primary' gutterBottom>กรณีส่งสินค้าเข้าสถานี</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <SelectProvince value={transport.rx.province} name='rxProvince' label='จังหวัดต้นทาง' onChange={(e) => {setTransport({...transport, rx: {...transport.rx, province: e.target.value}})}}></SelectProvince>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body1' align='left' gutterBottom sx={{display: 'flex', alignItems: 'center'}}>สถานีปลายทาง: <ArrowCircleDownIcon sx={{mx: 1}}/> สถานีขนส่งสินค้า</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CheckBoxGoodCategory value={transport.rx.goods}></CheckBoxGoodCategory>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </Slide>
  )
}

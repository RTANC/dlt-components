import { Container, Grid, Slide, Card, CardContent, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CardActions, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React, { useState } from 'react'
import SelectStation from '../components/SelectStation'
import SelectCompany from '../components/SelectCompany'
import DltDateTimePicker from '../components/DltDateTimePicker'
import SelectProvince from '../components/SelectProvince'
import SelectVehicleClass from '../components/SelectVehicleClass'
import SelectVehicleGroup from '../components/SelectVehicleGroup'
import SelectGoodCategory from '../components/SelectGoodCategory'
import SelectIsConfirm from '../components/SelectIsConfirm'
import CheckBoxVehicleStatus from '../components/CheckBoxVehicleStatus'
import DltTextField from '../components/DltTextField'
import formValidator from '../services/validator'
import moment from 'moment-timezone'
import SearchIcon from '@mui/icons-material/Search'

export default function Query() {
  const [params, setParams] = useState({
    queryId: 1,
    station: {
      value: 1,
      error: false,
      rules: []
    },
    company: '',
    startDateTime: {
      value: moment(),
      error: false,
      rules: []
    },
    endDateTime: {
      value: moment().add(1, 'day'),
      error: false,
      rules: []
    },
    inProvince: '',
    outProvince: '',
    vehicleClass: '',
    vehicleGroup: '',
    goodCategory: '',
    isConfirm: '',
    lp: '',
    isVehicleInStation: false,
    isOverWeight: false
  })

  params.station.rules = [params.station.value !== '' || '*ข้อมูลจำเป็น']
  params.startDateTime.rules = [params.startDateTime.value !== null || '*ข้อมูลจำเป็น', moment(params.startDateTime.value).isBefore(params.endDateTime.value) || '*วันเวลา-เริ่มต้น ต้องก่อน วันเวลา-สิ้นสุด']
  params.endDateTime.rules = [params.endDateTime.value !== null || '*ข้อมูลจำเป็น', moment(params.endDateTime.value).isAfter(params.startDateTime.value) || '*วันเวลา-สิ้นสุด ต้องหลัง วันเวลา-เริ่มต้น']

  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      if (formValidator(params, setParams)) {

      }
      
      // console.log(err)      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setParams({
      queryId: 1,
      station: {
        value: 1,
        error: false,
        rules: []
      },
      company: '',
      startDateTime: {
        value: moment(),
        error: false,
        rules: []
      },
      endDateTime: {
        value: moment().add(1, 'day'),
        error: false,
        rules: []
      },
      inProvince: '',
      outProvince: '',
      vehicleClass: '',
      vehicleGroup: '',
      goodCategory: '',
      isConfirm: '',
      lp: '',
      isVehicleInStation: false,
      isOverWeight: false
    })

    params.station.rules = [params.station.value !== '' || '*ข้อมูลจำเป็น']
    params.startDateTime.rules = [params.startDateTime.value !== null || '*ข้อมูลจำเป็น', moment(params.startDateTime.value).isBefore(params.endDateTime.value) || '*วันเวลา-เริ่มต้น ต้องก่อน วันเวลา-สิ้นสุด']
    params.endDateTime.rules = [params.endDateTime.value !== null || '*ข้อมูลจำเป็น', moment(params.endDateTime.value).isAfter(params.startDateTime.value) || '*วันเวลา-สิ้นสุด ต้องหลัง วันเวลา-เริ่มต้น']
  }
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
              สืบค้นข้อมูล
            </Typography>
            </CardContent>
            <CardContent>
              <Grid container spacing={2} direction='row' wrap='wrap'>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{display: 'flex', alignContent: 'flex-start'}}>
                  <FormControl>
                    <FormLabel sx={{display: 'flex', alignContent: 'flex-start'}}>เลือกข้อมูล</FormLabel>
                    <RadioGroup row value={params.queryId} onChange={(e) => {setParams({...params, 'queryId': e.target.value})}}>
                      <FormControlLabel value="1" control={<Radio />} label="รถที่มีรายการรับส่งสินค้า"></FormControlLabel>
                      <FormControlLabel value="2" control={<Radio />} label="รถทุกคันที่เข้าสถานีฯ"></FormControlLabel>
                      <FormControlLabel value="3" control={<Radio />} label="รถบรรทุกที่ออกจากสถานีฯ"></FormControlLabel>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <SelectStation value={params.station.value} name='station' onChange={(e) => {setParams({...params,'station': { ...params.station, 'value': e.target.value }})}} required error={params.station.error}></SelectStation>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <SelectCompany value={params.company} name='company' onChange={(e) => {setParams({...params,'company': e.target.value})}}></SelectCompany>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltDateTimePicker value={params.startDateTime.value} label='วันเวลา-เริ่มต้น' name='startDateTime' onChange={(e) => {setParams({...params,'startDateTime': { ...params.startDateTime, 'value': e }})}} required maxDateTime={new Date(params.endDateTime.value)} error={params.startDateTime.error}></DltDateTimePicker>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltDateTimePicker value={params.endDateTime.value} label='วันเวลา-สิ้นสุด' name='endDateTime' onChange={(e) => {setParams({...params,'endDateTime': { ...params.endDateTime, 'value': e }})}} required minDateTime={new Date(params.startDateTime.value)} error={params.endDateTime.error}></DltDateTimePicker>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <SelectProvince value={params.inProvince} label='จังหวัดต้นทาง' name='inProvince' onChange={(e) => {setParams({...params,'inProvince': e.target.value})}}></SelectProvince>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                <SelectProvince value={params.outProvince} label='จังหวัดปลายทาง' name='outProvince' onChange={(e) => {setParams({...params,'outProvince': e.target.value})}}></SelectProvince>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <SelectVehicleClass value={params.vehicleClass} label='ประเภทรถ' onChange={(e) => {setParams({...params,'vehicleClass': e.target.value})}}></SelectVehicleClass>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <SelectGoodCategory value={params.goodCategory} label='ประเภทสินค้า'  onChange={(e) => {setParams({...params,'goodCategory': e.target.value})}}></SelectGoodCategory>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <SelectVehicleGroup value={params.vehicleGroup} label='กลุ่มรถ' onChange={(e) => {setParams({...params,'vehicleGroup': e.target.value})}}></SelectVehicleGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <SelectIsConfirm value={params.isConfirm} label='ยืนยันรายการ' onChange={(e) => {setParams({...params,'isConfirm': e.target.value})}}></SelectIsConfirm>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltTextField label='ทะเบียนรถ' value={params.lp} onChange={(e) => {setParams({...params, 'lp': e.target.value})}}></DltTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <CheckBoxVehicleStatus isVehicleInStation={params.isVehicleInStation} isOverWeight={params.isOverWeight} onChange={(e) => {setParams({...params, [e.target.name]: e.target.checked})}}></CheckBoxVehicleStatus>
                </Grid>
              </Grid>
              <CardActions>
                <Box sx={{width: '100%', alignContent: 'center'}}>
                  <LoadingButton loading={loading} sx={{mx: 1}} color='primary' variant='contained' onClick={submit} startIcon={<SearchIcon></SearchIcon>}>ค้นหา</LoadingButton>
                  <LoadingButton loading={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={clear}>ล้างข้อมูล</LoadingButton>
                </Box>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </Slide>
  )
}

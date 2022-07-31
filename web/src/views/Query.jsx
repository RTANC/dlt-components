import { Container, Grid, Slide, Card, CardContent, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CardActions, Box, Stack, CardHeader } from '@mui/material'
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
import moment from 'moment'
import SearchIcon from '@mui/icons-material/Search'
import CachedIcon from '@mui/icons-material/Cached'
import { DataGrid } from '@mui/x-data-grid'

export default function Query() {
  const [loading, setLoading] = useState(false)
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

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3 },
    { field: 'timeStemp', headerName: 'วัน-เวลา บันทึกข้อมูล', sortable: true, flex: 1, valueFormatter: (params) => {
      try {
        if (!!params.value) {
          return moment(params.value).format('DD/MM/YYYY HH:mm:ss')
        }
      } catch (error) {
        return ''
      }
    } },
    { field: 'InTimeStemp', headerName: 'วัน-เวลา เข้า', sortable: true, flex: 1, valueFormatter: (params) => {
      try {
        if (!!params.value) {
          return moment(params.value).format('DD/MM/YYYY HH:mm:ss')
        }
      } catch (error) {
        return ''
      }
    } },
    { field: 'OutTimeStemp', headerName: 'วัน-เวลา ออก', sortable: true, flex: 1, valueFormatter: (params) => {
      try {
        if (!!params.value) {
          return moment(params.value).format('DD/MM/YYYY HH:mm:ss')
        }
      } catch (error) {
        return ''
      }
    } },
    { field: 'CompanyName', headerName: 'ผู้ประกอบการ', flex: 1 },
    { field: 'vehicleClass', headerName: 'ประเภทรถ', flex: 1 },
    { field: 'vehicleGroup', headerName: 'กลุ่มรถ', flex: 1 },
    { field: 'f1In', headerName: 'ทะเบียนหน้าขาเข้า', flex: 1 }
  ]

  const [rows, setRows] = useState([])

  params.station.rules = [params.station.value !== '' || '*ข้อมูลจำเป็น']
  params.startDateTime.rules = [params.startDateTime.value !== null || '*ข้อมูลจำเป็น', moment(params.startDateTime.value).isBefore(params.endDateTime.value) || '*วันเวลา-เริ่มต้น ต้องก่อน วันเวลา-สิ้นสุด']
  params.endDateTime.rules = [params.endDateTime.value !== null || '*ข้อมูลจำเป็น', moment(params.endDateTime.value).isAfter(params.startDateTime.value) || '*วันเวลา-สิ้นสุด ต้องหลัง วันเวลา-เริ่มต้น']

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
      <Container>
        <Stack spacing={2}>
          <Card>
            <CardHeader title="สืบค้นข้อมูล" titleTypographyProps={{variant: 'h5', align: 'center'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
            <CardContent>
              <Grid container spacing={2} direction='row' wrap='wrap'>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel sx={{display: 'flex', alignContent: 'flex-start'}}>เลือกข้อมูล</FormLabel>
                    <RadioGroup row value={params.queryId} onChange={(e) => {setParams({...params, 'queryId': e.target.value})}}>
                      <FormControlLabel value="1" control={<Radio />} label="รถที่มีรายการรับส่งสินค้า"></FormControlLabel>
                      <FormControlLabel value="2" control={<Radio />} label="รถทุกคันที่เข้าสถานีฯ"></FormControlLabel>
                      <FormControlLabel value="3" control={<Radio />} label="รถบรรทุกที่ออกจากสถานีฯ"></FormControlLabel>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectStation value={params.station.value} name='station' onChange={(e) => {setParams({...params,'station': { ...params.station, 'value': e.target.value }})}} required error={params.station.error}></SelectStation>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <DltDateTimePicker value={params.startDateTime.value} label='วันเวลา-เริ่มต้น' name='startDateTime' onChange={(e) => {setParams({...params,'startDateTime': { ...params.startDateTime, 'value': e }})}} required maxDateTime={new Date(params.endDateTime.value)} error={params.startDateTime.error}></DltDateTimePicker>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <DltDateTimePicker value={params.endDateTime.value} label='วันเวลา-สิ้นสุด' name='endDateTime' onChange={(e) => {setParams({...params,'endDateTime': { ...params.endDateTime, 'value': e }})}} required minDateTime={new Date(params.startDateTime.value)} error={params.endDateTime.error}></DltDateTimePicker>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectCompany value={params.company} name='company' onChange={(e) => {setParams({...params,'company': e.target.value})}} station={params.station.value}></SelectCompany>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectProvince value={params.inProvince} label='จังหวัดต้นทาง' name='inProvince' onChange={(e) => {setParams({...params,'inProvince': e.target.value})}}></SelectProvince>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectProvince value={params.outProvince} label='จังหวัดปลายทาง' name='outProvince' onChange={(e) => {setParams({...params,'outProvince': e.target.value})}}></SelectProvince>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectVehicleClass value={params.vehicleClass} label='ประเภทรถ' onChange={(e) => {setParams({...params,'vehicleClass': e.target.value})}}></SelectVehicleClass>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectGoodCategory value={params.goodCategory} label='ประเภทสินค้า'  onChange={(e) => {setParams({...params,'goodCategory': e.target.value})}}></SelectGoodCategory>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectVehicleGroup value={params.vehicleGroup} label='กลุ่มรถ' onChange={(e) => {setParams({...params,'vehicleGroup': e.target.value})}}></SelectVehicleGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectIsConfirm value={params.isConfirm} label='ยืนยันรายการ' onChange={(e) => {setParams({...params,'isConfirm': e.target.value})}}></SelectIsConfirm>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <DltTextField label='ทะเบียนรถ' value={params.lp} onChange={(e) => {setParams({...params, 'lp': e.target.value})}}></DltTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <CheckBoxVehicleStatus isVehicleInStation={params.isVehicleInStation} isOverWeight={params.isOverWeight} onChange={(e) => {setParams({...params, [e.target.name]: e.target.checked})}}></CheckBoxVehicleStatus>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
              <LoadingButton loading={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={clear}>ล้างข้อมูล</LoadingButton>
              <LoadingButton loading={loading} sx={{mx: 1}} color='primary' variant='contained'>ค้นหา</LoadingButton>
            </CardActions>
          </Card>
          <Card>
            <CardContent>
              <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick sx={{height: 400}}/>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Slide>
  )
}

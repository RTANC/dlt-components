import { Container, Grid, Slide, Card, CardContent, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CardActions, Box, Stack, CardHeader } from '@mui/material'
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
import BtnSearch from '../components/BtnSearch'
import BtnClear from '../components/BtnClear'
import DltTextField from '../components/DltTextField'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid'
import { dateTimeFormatter } from '../services/utils'

export default function Query() {
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState({
    queryId: 1,
    station: 1,
    company: '',
    startDateTime: moment().startOf('day'),
    endDateTime: moment().endOf('day'),
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
          return dateTimeFormatter(params.value)
        }
      } catch (error) {
        return ''
      }
    } },
    { field: 'InTimeStemp', headerName: 'วัน-เวลา เข้า', sortable: true, flex: 1, valueFormatter: (params) => {
      try {
        if (!!params.value) {
          return dateTimeFormatter(params.value)
        }
      } catch (error) {
        return ''
      }
    } },
    { field: 'OutTimeStemp', headerName: 'วัน-เวลา ออก', sortable: true, flex: 1, valueFormatter: (params) => {
      try {
        if (!!params.value) {
          return dateTimeFormatter(params.value)
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

  const search = async (e) => {
    try {
      setLoading(true)
      
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
      station: 1,
      company: '',
      startDateTime: moment(),
      endDateTime: moment().add(1, 'day'),
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
  }

  const handleChange = (e) => {
    params[e.target.name] = e.target.value
    setParams({...params})
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
                    <RadioGroup row value={params.queryId} name='queryId' onChange={handleChange}>
                      <FormControlLabel value={1} control={<Radio />} label="รถที่มีรายการรับส่งสินค้า"></FormControlLabel>
                      <FormControlLabel value={2} control={<Radio />} label="รถทุกคันที่เข้าสถานีฯ"></FormControlLabel>
                      <FormControlLabel value={3} control={<Radio />} label="รถบรรทุกที่ออกจากสถานีฯ"></FormControlLabel>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectStation value={params.station} name='station' onChange={handleChange} required></SelectStation>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <DltDateTimePicker value={params.startDateTime} label='วันเวลา-เริ่มต้น' name='startDateTime' onChange={handleChange} required maxDateTime={new Date(params.endDateTime)}></DltDateTimePicker>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <DltDateTimePicker value={params.endDateTime} label='วันเวลา-สิ้นสุด' name='endDateTime' onChange={handleChange} required minDateTime={new Date(params.startDateTime)}></DltDateTimePicker>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectCompany value={params.company} name='company' onChange={handleChange} station={params.station}></SelectCompany>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectProvince value={params.inProvince} label='จังหวัดต้นทาง' name='inProvince' onChange={handleChange}></SelectProvince>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectProvince value={params.outProvince} label='จังหวัดปลายทาง' name='outProvince' onChange={handleChange}></SelectProvince>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectVehicleClass value={params.vehicleClass} label='ประเภทรถ' onChange={handleChange}></SelectVehicleClass>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectGoodCategory value={params.goodCategory} label='ประเภทสินค้า' onChange={handleChange}></SelectGoodCategory>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectVehicleGroup value={params.vehicleGroup} label='กลุ่มรถ' onChange={handleChange}></SelectVehicleGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectIsConfirm value={params.isConfirm} label='ยืนยันรายการ' onChange={handleChange}></SelectIsConfirm>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <DltTextField label='ทะเบียนรถ' value={params.lp} onChange={handleChange}></DltTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <CheckBoxVehicleStatus isVehicleInStation={params.isVehicleInStation} isOverWeight={params.isOverWeight} onChange={(e) => {setParams({...params, [e.target.name]: e.target.checked})}}></CheckBoxVehicleStatus>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
              <BtnClear loading={loading} onClick={clear}></BtnClear>
              <BtnSearch loading={loading} onClick={search}></BtnSearch>
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

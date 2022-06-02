import { Container, Grid, Slide, Card, CardContent, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CardActions, Button, Box } from '@mui/material'
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

export default function Query() {
  const [params, setParams] = useState({
    queryId: null,
    station: '',
    company: '',
    startDateTime: null,
    endDateTime: null,
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
                  <SelectStation value={params.station} name='station' onChange={(e) => {setParams({...params,'station': e.target.value})}}></SelectStation>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <SelectCompany value={params.company} name='company' onChange={(e) => {setParams({...params,'company': e.target.value})}}></SelectCompany>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltDateTimePicker label='วันเวลา-เริ่มต้น' name='startDateTime' onChange={(e) => {setParams({...params,'startDateTime': e})}}></DltDateTimePicker>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltDateTimePicker label='วันเวลา-สิ้นสุด' name='endDateTime' onChange={(e) => {setParams({...params,'endDateTime': e})}}></DltDateTimePicker>
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
                <Button color='info'>ค้นหา</Button>
                <Button>ล้างข้อมูล</Button>
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

import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, Stack, IconButton, Divider } from '@mui/material'
import React from 'react'
import SelectStation from '../../../components/SelectStation'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useNavigate, useParams } from 'react-router-dom'
import SelectCompany from '../../../components/SelectCompany'
import DltTextField from '../../../components/DltTextField'
import RadioBoxIsActiveUser from '../../../components/RadioBoxIsActiveUser'
import SelectVehicleClass from '../../../components/SelectVehicleClass'
import SelectLPProvince from '../../../components/SelectLPProvince'
import { useEffect } from 'react'
import ImageListLP from '../../../components/ImageListLP'

export default function G2VehicleForm() {
    const navigate = useNavigate()
    const { gid } = useParams()
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [g2Vehicle, setG2Vehicle] = useState({
        station: {
            value: 1
        },
        company: {
            value: '',
            error: false,
            rules: [(v) => !!v || '*ข้อมูลจำเป็น']
        },
        licensePlate: {
            value: ''
        },
        vehicleClass: {
          value: ''
        },
        frontLP: {
          value: ''
        },
        frontLPProvince: {
          value: ''
        },
        rearLP: {
          value: ''
        },
        rearLPProvince: {
          value: ''
        },
        isActive: {
          value: true
        }
    })

    const handleValueChange = (e) => {
        g2Vehicle[e.target.name].value = e.target.value
        setG2Vehicle({...g2Vehicle})
    }

    const save = async () => {
        try {
          setLoading(true)
          // const data = (await getG2Vehicles(g2Vehicle.station.value, g2Vehicle.company.value, g2Vehicle.licensePlate.value)).data
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    
      const cancel = () => {
        navigate(-1)
      }

      const init = async () => {
        try {
          
        } catch (error) {
          
        }
      }

      useEffect(() => {
        if (gid !== '0') {
          setEditMode(true)
          init()
        } else {
          setEditMode(false)
        }
      }, [])

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
          <Stack spacing={2}>
            <Card>
              <CardHeader title='แก้ไขรายการรถลูกค้าของผู้ประกอบการ' titleTypographyProps={{variant: 'h5', display: 'flex', justifyContent: 'center'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12} md={6}>
                    <SelectStation value={g2Vehicle.station.value} name='station' onChange={handleValueChange} required></SelectStation>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RadioBoxIsActiveUser value={g2Vehicle.isActive.value} label='สถานะการใช้งาน' name='isActive' onChange={handleValueChange}></RadioBoxIsActiveUser>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider></Divider>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SelectCompany value={g2Vehicle.company.value} name='company' onChange={handleValueChange} station={g2Vehicle.station.value} required></SelectCompany>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SelectVehicleClass value={g2Vehicle.vehicleClass.value} name='vehicleClass' onChange={handleValueChange} required></SelectVehicleClass>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DltTextField label='ทะเบียนหน้า' value={g2Vehicle.frontLP.value} name='frontLP' onChange={handleValueChange} placeholder='XX-XXXXX' required></DltTextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DltTextField label='ทะเบียนหลัง' value={g2Vehicle.rearLP.value} name='rearLP' onChange={handleValueChange} placeholder='XX-XXXXX' required></DltTextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SelectLPProvince label='จังหวัด' value={g2Vehicle.frontLPProvince.value} name='frontLPProvince' onChange={handleValueChange} required></SelectLPProvince>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SelectLPProvince label='จังหวัด' value={g2Vehicle.rearLPProvince.value} name='rearLPProvince' onChange={handleValueChange} required></SelectLPProvince>
                  </Grid>
                  {editMode && <Grid item xs={12}>
                    <ImageListLP></ImageListLP>
                  </Grid>}
                  <Grid item xs={12}>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                      <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={cancel}>ล้างข้อมูล</LoadingButton>
                      <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='primary' variant='contained' onClick={save}>บันทึกข้อมูล</LoadingButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Container>
    </Slide>
  )
}

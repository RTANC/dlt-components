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
import { createG2Vehicle, getG2Vehicle } from '../../../services/managements'
import BtnSave from '../../../components/BtnSave'
import BtnClear from '../../../components/BtnClear'
import formValidator from '../../../services/validator'
import G2Vehicle from './G2Vehicle'
import { getKeyValue } from '../../../services/utils'

export default function G2VehicleForm() {
    const navigate = useNavigate()
    const { gid } = useParams()
    const [loading, setLoading] = useState(false)
    const [valid, setValid] = useState(false)
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
        vehicleClass: {
          value: '',
          error: false,
          rules: [(v) => !!v || '*ข้อมูลจำเป็น']
        },
        frontLP: {
          value: '',
          error: false,
          rules: [(v) => !!v || '*ข้อมูลจำเป็น']
        },
        frontLPProvince: {
          value: '',
          error: false,
          rules: [(v) => !!v || '*ข้อมูลจำเป็น']
        },
        rearLP: {
          value: '',
          error: false,
          rules: [(v) => !!v || '*ข้อมูลจำเป็น']
        },
        rearLPProvince: {
          value: '',
          error: false,
          rules: [(v) => !!v || '*ข้อมูลจำเป็น']
        },
        isActive: {
          value: true
        }
    })

    const handleValueChange = (e) => {
        g2Vehicle[e.target.name].value = e.target.value
        setG2Vehicle({...g2Vehicle})
        setValid(formValidator(g2Vehicle, setG2Vehicle))
    }

    const save = async () => {
        try {
          setLoading(true)
          if (gid === '0') {
            await createG2Vehicle(getKeyValue(g2Vehicle))
            navigate(-1)
          } else {

          }
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    
      const clear = () => {
        navigate(-1)
      }

      const init = async () => {
        try {
          const data = (await getG2Vehicle(gid)).data
          g2Vehicle.station.value = data.StationID
          g2Vehicle.company.value = data.CompanyID
          g2Vehicle.vehicleClass.value = data.VehicleClassID
          g2Vehicle.frontLP.value = data.FrontLP
          g2Vehicle.frontLPProvince.value = data.FrontLPPID
          g2Vehicle.rearLP.value = data.RearLP
          g2Vehicle.rearLPProvince.value = data.RearLPPID
          g2Vehicle.isActive.value = data.IsActive
          setG2Vehicle({...g2Vehicle})
          setValid(formValidator(g2Vehicle, setG2Vehicle))
        } catch (error) {
          console.log(error)
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
                    <SelectCompany value={g2Vehicle.company.value} name='company' onChange={handleValueChange} station={g2Vehicle.station.value} required error={g2Vehicle.company.error}></SelectCompany>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SelectVehicleClass value={g2Vehicle.vehicleClass.value} name='vehicleClass' onChange={handleValueChange} required error={g2Vehicle.vehicleClass.error}></SelectVehicleClass>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DltTextField label='ทะเบียนหน้า' value={g2Vehicle.frontLP.value} name='frontLP' onChange={handleValueChange} onKeyUp={e => setValid(formValidator(g2Vehicle, setG2Vehicle))} placeholder='XX-XXXXX' required error={g2Vehicle.frontLP.error}></DltTextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DltTextField label='ทะเบียนหลัง' value={g2Vehicle.rearLP.value} name='rearLP' onChange={handleValueChange} onKeyUp={e => setValid(formValidator(g2Vehicle, setG2Vehicle))} placeholder='XX-XXXXX' required error={g2Vehicle.rearLP.error}></DltTextField>
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
                      <BtnClear loading={loading} onClick={clear}></BtnClear>
                      <BtnSave loading={loading} onClick={save} disabled={!valid}></BtnSave>
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

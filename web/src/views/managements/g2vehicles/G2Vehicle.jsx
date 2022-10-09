import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, Stack, IconButton } from '@mui/material'
import React from 'react'
import SelectStation from '../../../components/SelectStation'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { SquareEditOutline } from 'mdi-material-ui'
import { DataGrid } from '@mui/x-data-grid'
import SelectCompany from '../../../components/SelectCompany'
import DltTextField from '../../../components/DltTextField'
import moment from 'moment'
import { getG2Vehicles } from '../../../services/managements'
import BtnClear from '../../../components/BtnClear'
import BtnSearch from '../../../components/BtnSearch'

export default function G2Vehicle() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
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
        }
    })

    const handleValueChange = (e) => {
        g2Vehicle[e.target.name].value = e.target.value
        setG2Vehicle({...g2Vehicle})
    }

    const search = async () => {
        try {
          setLoading(true)
          const data = (await getG2Vehicles(g2Vehicle.station.value, g2Vehicle.company.value, g2Vehicle.licensePlate.value)).data
          setRows(data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    
      const cancel = () => {
        navigate(-1)
      }

      const columns = [
        { field: 'id', headerName: 'ที่', flex: 0.3 },
        { field: 'IsActive', headerName: 'สถานะ', flex: 1, valueFormatter: (params) => {
          if (params.value) {
            return 'เปิดใช้งาน'
          } else {
            return 'ปิดการใช้งาน'
          }
        }},
        { field: 'EntryDate', headerName: 'บันทึกครั้งแรก', flex: 1, valueFormatter: (params) => {
          try {
            return moment(params.value).utc().add(543, 'y').format('DD/MM/YYYY')
          } catch (error) {
            return ''
          }
        }},
        { field: 'CompanyName', headerName: 'ผู้ประกอบการ', flex: 2 },
        { field: 'Description', headerName: 'ประเภทรถ', flex: 1 },
        { field: 'FrontLP', headerName: 'ทะเบียนหน้า', flex: 1 },
        { field: 'RearLP', headerName: 'ทะเบียนหลัง', flex: 1 },
        {
          field: 'G2VehicleID',
          headerName: 'แก้ไข',
          sortable: false,
          flex: 0.4,
          type: 'actions',
          renderCell: (params) => (<IconButton color="warning" onClick={() => {navigate('/management/g2Vehicle/'+params.value)}}><SquareEditOutline/></IconButton>)
        }
      ]
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container sx={{height: '100vh'}}>
          <Stack spacing={2}>
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text'>รายการรถลูกค้าของผู้ประกอบการ</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Card>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12} md={4}>
                    <SelectStation value={g2Vehicle.station.value} name='station' onChange={handleValueChange} required></SelectStation>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <SelectCompany value={g2Vehicle.company.value} name='company' onChange={handleValueChange} station={g2Vehicle.station.value}></SelectCompany>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <DltTextField value={g2Vehicle.licensePlate.value} name='licensePlate' onChange={handleValueChange} label='ค้นหาทะเบียนรถ'></DltTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                      <BtnClear loading={loading} disabled={loading} onClick={cancel}></BtnClear>
                      <BtnSearch loading={loading} disabled={loading} onClick={search}></BtnSearch>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                      <LoadingButton loading={loading} disabled={loading} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 24, height: 48, background: 'linear-gradient(102.79deg, #F3B922 0%, #A37A10 98.65%)', borderRadius: 3, color: 'white', mx: 1}} color='warning' variant='contained' onClick={() => {navigate('/management/g2Vehicle/0')}}>เพิ่มรถ</LoadingButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        sx={{height: 400, width: '100%', color: 'white'}}
                      />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Container>
    </Slide>
  )
}

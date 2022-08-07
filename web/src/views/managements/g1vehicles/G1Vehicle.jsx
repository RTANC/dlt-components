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
import { getG1Vehicles } from '../../../services/managements'
import { dateTimeFormatter } from '../../../services/utils'

export default function G1Vehicle() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [g1Vehicle, setG1Vehicle] = useState({
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
        g1Vehicle[e.target.name].value = e.target.value
        setG1Vehicle({...g1Vehicle})
    }

    const search = async () => {
        try {
          setLoading(true)
          const data = (await getG1Vehicles(g1Vehicle.station.value, g1Vehicle.company.value, g1Vehicle.licensePlate.value)).data
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
        { field: 'IsActive', headerName: 'สถานะ', flex: 0.5, valueFormatter: (params) => {
          if (params.value === 1) {
            return 'เปิดใช้งาน'
          } else {
            return 'ปิดการใช้งาน'
          }
        }},
        { field: 'EntryDate', headerName: 'บันทึกครั้งแรก', flex: 1, valueFormatter: (params) => {
          try {
            return dateTimeFormatter(params.value)
          } catch (error) {
            return ''
          }
        }},
        { field: 'CompanyName', headerName: 'ผู้ประกอบการ', flex: 2 },
        { field: 'Description', headerName: 'ประเภทรถ', flex: 1 },
        { field: 'FrontLP', headerName: 'ทะเบียนหน้า', flex: 1 },
        { field: 'RearLP', headerName: 'ทะเบียนหลัง', flex: 1 },
        {
          field: 'G1VehicleID',
          headerName: 'แก้ไข',
          sortable: false,
          flex: 0.4,
          type: 'actions',
          renderCell: (params) => (<IconButton color="warning" onClick={() => {navigate('/management/g1Vehicle/'+params.value)}}><SquareEditOutline/></IconButton>)
        }
      ]

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
          <Stack spacing={2}>
            <Card>
              <CardHeader title='รายการรถของผู้ประกอบการ' titleTypographyProps={{variant: 'h5', display: 'flex', justifyContent: 'center'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12} md={4}>
                    <SelectStation value={g1Vehicle.station.value} name='station' onChange={handleValueChange} required></SelectStation>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <SelectCompany value={g1Vehicle.company.value} name='company' onChange={handleValueChange} station={g1Vehicle.station.value}></SelectCompany>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <DltTextField value={g1Vehicle.licensePlate.value} name='licensePlate' onChange={handleValueChange} label='ค้นหาทะเบียนรถ'></DltTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                      <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={cancel}>ล้างข้อมูล</LoadingButton>
                      <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='primary' variant='contained' onClick={search}>ค้นหา</LoadingButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                      <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='warning' variant='contained' onClick={() => {navigate('/management/g1Vehicle/0')}}>เพิ่มรถ</LoadingButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        sx={{height: 400, width: '100%'}}
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

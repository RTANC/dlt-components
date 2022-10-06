import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, Stack, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import SelectStation from '../../../components/SelectStation'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { SquareEditOutline } from 'mdi-material-ui'
import { DataGrid } from '@mui/x-data-grid'
import { getCompanies } from '../../../services/managements'

export default function Company() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([])
  const [company, setCompany] = useState({
    station: {
      value: 1
    }
  })

  const columns = [
    { field: 'id', headerName: 'ที่', flex: 0.3 },
    { field: 'CompanyCode', headerName: 'รหัส', flex: 0.3, valueFormatter: (params) => {
      try {
        if (!!params.value) {
          return parseInt(params.value).toLocaleString('en-US', {
            minimumIntegerDigits: 3,
            useGrouping: false
          })
        }
      } catch (error) {
        return params.value
      }
    }},
    { field: 'StationName', headerName: 'สถานี', flex: 0.8 },
    { field: 'CompanyName', headerName: 'ผู้ประกอบการ', flex: 2 },
    { field: 'TransportLicenseID', headerName: 'เลขที่ใบอนุญาต', flex: 1 },
    { field: 'TransportTypeID', headerName: 'ประเภทการขนส่ง', flex: 1, valueFormatter: (params) => {
      if (!!params.value) {
        switch (params.value) {
          case 1: return 'ไม่ประจำทาง'
          break
          case 2: return 'ส่วนบุคคล'
          break
        }
      }
    } },
    { field: 'TransportScopeID', headerName: 'ขอบเขตพื้นที่', flex: 1, valueFormatter: (params) => {
      if (!!params.value) {
        switch (params.value) {
          case 1: return 'ในประเทศ' 
          break
          case 2: return 'ระหว่างประเทศ'
          break
          case 3: return 'ในประเทศ/ระหว่างประเทศ'
          break
        }
      }
    } },
    {
      field: 'CompanyID',
      headerName: 'แก้ไข',
      sortable: false,
      flex: 0.4,
      type: 'actions',
      renderCell: (params) => (<IconButton color="warning" onClick={() => {navigate('/management/company/'+params.value)}}><SquareEditOutline/></IconButton>)
    }
  ]

  const handleValueChange = (e) => {
    company[e.target.name].value = e.target.value
    setCompany({...company})
  }

  const search = async () => {
    try {
      setLoading(true)
      const data = (await getCompanies(company.station.value)).data
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

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
          <Stack spacing={2}>
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text'>รายชื่อผู้ประกอบการ</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Card>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12}>
                    <SelectStation value={company.station.value} name='station' onChange={handleValueChange}></SelectStation>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                      <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={cancel}>ล้างข้อมูล</LoadingButton>
                      <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='primary' variant='contained' onClick={search}>ค้นหา</LoadingButton>
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

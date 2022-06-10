import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, IconButton } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import CachedIcon from '@mui/icons-material/Cached'
import SelectUserRole from '../../../components/SelectUserRole'
import SelectStation from '../../../components/SelectStation'
import DltTextField from '../../../components/DltTextField'
import { LoadingButton } from '@mui/lab'
import SelectAgency from '../../../components/SelectAgency'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment-timezone'
import EditIcon from '@mui/icons-material/Edit'

export default function User() {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    userRole: 3,
    station: 1,
    agency: '',
    text: ''
  })

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3 },
    { field: 'LoginName', headerName: 'User Name', flex: 1 },
    { field: 'FullName', headerName: 'ชื่อ - นามสกุล', flex: 1 },
    { field: 'RoleName', headerName: 'กลุ่มผู้ใช้', flex: 1 },
    { field: 'CompanyName', headerName: 'หน่วยงาน', flex: 1 },
    { field: 'PhoneNo', headerName: 'เบอร์ติดต่อ', flex: 1 },
    { field: 'EmailAddress', headerName: 'Email', flex: 1 },
    { field: 'LastLogInDateTime', headerName: 'ล็อคอินครั้งล่าสุด', sortable: true, flex: 1, valueFormatter: (params) => {
      try {
        if (!!params.value) {
          return moment(params.value).format('DD/MM/YYYY HH:mm:ss')
        }
      } catch (error) {
        return ''
      }
    } },
    { field: 'IsActive', headerName: 'Active', sortable: false, flex: 0.3 },
    {
      field: 'UserID',
      headerName: 'แก้ไข',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 0.4,
      renderCell: (params) => (<IconButton color="primary"><EditIcon/></IconButton>)
    }
  ]

  const rows = [
    { id: 1, UserID: '1', LoginName: 'Jon', FullName: 'jonny dep', RoleID: 'admin', CompanyID: 'hollywood', PhoneNo: '9999999999', EmailAddress: 'dep@gmail.com', LastLogInDateTime: moment(), IsActive: 'Yes'  }
  ]

  const search = async () => {
    try {

    } catch (error) {
      console.log(error)
    }
  }

  const cancel = () => {

  }
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container maxWidth="false">
            <Card>
                <CardHeader title={<Box sx={{display: 'flex',alignItems: 'center' }}><SearchIcon/> ข้อมูลผู้ใช้งาน</Box>} titleTypographyProps={{variant: 'h6', align: 'left'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
                <CardContent>
                  <Grid container spacing={2} direction='row' wrap="wrap">
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <SelectUserRole value={query.userRole} onChange={(e) => {setQuery({...query, userRole: e.target.value})}}></SelectUserRole>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <SelectStation value={query.station} onChange={(e) => {setQuery({...query, station: e.target.value})}}></SelectStation>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <SelectAgency value={query.agency} onChange={(e) => {setQuery({...query, agency: e.target.value})}} stationId={query.station}></SelectAgency>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <DltTextField label='ชื่อ/นามสกุล/UserName' value={query.text} onChange={(e) => {setQuery({...query, text: e.target.value})}}></DltTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{width: '100%', alignContent: 'center'}}>
                        <LoadingButton loading={loading} sx={{mx: 1}} color='primary' variant='contained' onClick={search} startIcon={<SearchIcon></SearchIcon>}>ค้นหา</LoadingButton>
                        <LoadingButton loading={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={cancel} startIcon={<CachedIcon/>}>ยกเลิก</LoadingButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                      />
                    </div>
                    </Grid>
                  </Grid>
                </CardContent>
            </Card>
        </Container>
    </Slide>
  )
}

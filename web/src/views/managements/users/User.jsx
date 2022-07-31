import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, IconButton, Divider, Button } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import CachedIcon from '@mui/icons-material/Cached'
import SelectUserRole from '../../../components/SelectUserRole'
import SelectStation from '../../../components/SelectStation'
import DltTextField from '../../../components/DltTextField'
import { LoadingButton } from '@mui/lab'
import SelectAgency from '../../../components/SelectAgency'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import EditIcon from '@mui/icons-material/Edit'
import { getUsers } from '../../../services/managements'
import { useNavigate } from 'react-router-dom'
import { SquareEditOutline } from 'mdi-material-ui'

export default function User() {
  const navigate = useNavigate()
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
    { field: 'IsActive', headerName: 'Active', sortable: false, flex: 0.3, valueFormatter: (params) => {
      try {
        if (params.value) {
          return 'Yes'
        } else {
          return 'No'
        }
      } catch (error) {
        return ''
      }
    } },
    {
      field: 'UserID',
      headerName: 'แก้ไข',
      sortable: false,
      flex: 0.4,
      type: 'actions',
      renderCell: (params) => (<IconButton color="warning" onClick={() => {navigate('/management/user/'+params.value)}}><SquareEditOutline/></IconButton>)
    }
  ]

  const [rows, setRows] = useState([])

  const search = async () => {
    try {
      setLoading(true)
      const data = (await getUsers(query.userRole, query.station, query.agency, query.text)).data
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
            <Card>
                <CardHeader title='ข้อมูลผู้ใช้งาน' titleTypographyProps={{variant: 'h5', display: 'flex', justifyContent: 'center'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
                <CardContent>
                  <Grid container spacing={2} direction='row' wrap="wrap">
                    <Grid item xs={12}>
                      <SelectUserRole value={query.userRole} onChange={(e) => {setQuery({...query, userRole: e.target.value})}}></SelectUserRole>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider></Divider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <SelectStation value={query.station} onChange={(e) => {setQuery({...query, station: e.target.value})}}></SelectStation>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <SelectAgency value={query.agency} onChange={(e) => {setQuery({...query, agency: e.target.value})}} stationId={query.station}></SelectAgency>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <DltTextField label='ชื่อ/นามสกุล/UserName' value={query.text} onChange={(e) => {setQuery({...query, text: e.target.value})}}></DltTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={cancel} startIcon={<CachedIcon/>}>ล้างข้อมูล</LoadingButton>
                        <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='primary' variant='contained' onClick={search} startIcon={<SearchIcon></SearchIcon>}>ค้นหา</LoadingButton>
                        <Button variant='contained' color='warning' onClick={() => {navigate('/management/user/0')}}>เพิ่มผู้ใช้งาน</Button>
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
        </Container>
    </Slide>
  )
}

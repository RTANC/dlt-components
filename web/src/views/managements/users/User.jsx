import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, IconButton, Divider, Button } from '@mui/material'
import React, { useState } from 'react'
import SelectUserRole from '../../../components/SelectUserRole'
import SelectStation from '../../../components/SelectStation'
import DltTextField from '../../../components/DltTextField'
import SelectAgency from '../../../components/SelectAgency'
import { DataGrid } from '@mui/x-data-grid'
import { getUsers } from '../../../services/managements'
import { useNavigate } from 'react-router-dom'
import { SquareEditOutline } from 'mdi-material-ui'
import BtnAdd from '../../../components/BtnAdd'
import BtnClear from '../../../components/BtnClear'
import BtnSearch from '../../../components/BtnSearch'
import { dateTimeFormatter } from '../../../services/utils'

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
    { field: 'IsActive', headerName: 'สถานะ', sortable: false, flex: 0.5, valueFormatter: (params) => {
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
    { field: 'LoginName', headerName: 'ชื่อผู้ใช้งาน', flex: 1 },
    { field: 'FullName', headerName: 'ชื่อ - นามสกุล', flex: 1 },
    { field: 'RoleName', headerName: 'กลุ่มผู้ใช้', flex: 1 },
    { field: 'CompanyName', headerName: 'หน่วยงาน', flex: 1 },
    // { field: 'PhoneNo', headerName: 'เบอร์ติดต่อ', flex: 1 },
    // { field: 'EmailAddress', headerName: 'Email', flex: 1 },
    { field: 'LastLogInDateTime', headerName: 'ล็อคอินครั้งล่าสุด', sortable: true, flex: 1, valueFormatter: (params) => {
      try {
        if (!!params.value) {
          return dateTimeFormatter(params.value)
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

  const clear = () => {
    setQuery({
      userRole: 3,
      station: 1,
      agency: '',
      text: ''
    })
    setRows([])
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
                        <BtnClear loading={loading} onClick={clear}></BtnClear>
                        <BtnSearch loading={loading} onClick={search}></BtnSearch>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                        <BtnAdd label='เพิ่มผู้ใช้งาน' onClick={() => {navigate('/management/user/0')}}></BtnAdd>
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

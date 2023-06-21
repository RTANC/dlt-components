import { Card, Container, Slide, Box, CardContent, Grid, IconButton, Divider, Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, TablePagination } from '@mui/material'
import React, { useState } from 'react'
import SelectUserRole from '../../../components/SelectUserRole'
import SelectStation from '../../../components/SelectStation'
import DltTextField from '../../../components/DltTextField'
import SelectAgency from '../../../components/SelectAgency'
import { getUsers } from '../../../services/managements'
import { useNavigate } from 'react-router-dom'
import { SquareEditOutline } from 'mdi-material-ui'
import BtnAdd from '../../../components/BtnAdd'
import BtnClear from '../../../components/BtnClear'
import BtnSearch from '../../../components/BtnSearch'
import { dateTimeFormatter } from '../../../services/utils'
import { useEffect } from 'react'

export default function User() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [query, setQuery] = useState({
    userRole: -1,
    station: 1,
    agency: '',
    text: ''
  })

  const columns = [
    { id: 'IsActive', label: 'สถานะ', align: 'center', format: (value) => {
      try {
        if (value) {
          return 'Yes'
        } else {
          return 'No'
        }
      } catch (error) {
        return ''
      }
    } },
    { id: 'LoginName', label: 'ชื่อผู้ใช้งาน', align: 'center' },
    { id: 'FullName', label: 'ชื่อ - นามสกุล', align: 'center' },
    { id: 'RoleName', label: 'กลุ่มผู้ใช้', align: 'center' },
    { id: 'CompanyName', label: 'หน่วยงาน', align: 'center' },
    { id: 'LastLogInDateTime', label: 'ล็อคอินครั้งล่าสุด', align: 'center', format: (value) => {
      try {
        if (!!value) {
          return dateTimeFormatter(value)
        }
      } catch (error) {
        return ''
      }
    } },
    { id: 'edit', label: 'แก้ไข'}
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const [rows, setRows] = useState([])

  const search = async () => {
    try {
      setLoading(true)
      setRows([])
      setPage(0)
      setRowsPerPage(10)
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
      userRole: -1,
      station: 1,
      agency: '',
      text: ''
    })
    setRows([])
  }

  useEffect(() => {
    search()
  }, [])
  

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text'>ข้อมูลผู้ใช้งาน</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Card>
                <CardContent>
                  <Grid container spacing={2} direction='row' wrap="wrap">
                    <Grid item xs={12}>
                      <SelectUserRole value={query.userRole} onChange={(e) => {setQuery({...query, userRole: e.target.value})}} forSearch></SelectUserRole>
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
                      <DltTextField label='ชื่อ/นามสกุล/UserName' value={query.text} onChange={(e) => {setQuery({...query, text: e.target.value})}} autoComplete='on'></DltTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', py: 2}}>
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
                      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ minHeight: 400, maxHeight: 450, color: 'white' }}>
                          <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                              <TableRow>
                                {columns.map((column) => (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.label}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                  return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                      <TableCell align={columns[0].align}>{columns[0].format(row.IsActive)}</TableCell>
                                      <TableCell align={columns[1].align}>{row.LoginName}</TableCell>
                                      <TableCell align={columns[2].align}>{row.FullName}</TableCell>
                                      <TableCell align={columns[3].align}>{row.RoleName}</TableCell>
                                      <TableCell align={columns[4].align}>{row.CompanyName}</TableCell>
                                      <TableCell align={columns[5].align}>{columns[5].format(row.LastLogInDateTime)}</TableCell>
                                      <TableCell align='center'><IconButton color="warning" onClick={() => {navigate('/management/user/' + row.UserID)}}><SquareEditOutline/></IconButton></TableCell>
                                    </TableRow>
                                  )
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[10, 25, 100]}
                          component="div"
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
            </Card>
        </Container>
    </Slide>
  )
}

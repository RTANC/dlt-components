import { Card, Container, Slide, Box, CardContent, Grid, Stack, IconButton, Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, TablePagination } from '@mui/material'
import React from 'react'
import SelectStation from '../../../components/SelectStation'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { SquareEditOutline } from 'mdi-material-ui'
import { getCompanies } from '../../../services/managements'
import BtnClear from '../../../components/BtnClear'
import BtnSearch from '../../../components/BtnSearch'
import { useEffect } from 'react'
import DltSearchBar from '../../../components/DltSearchBar'

export default function Company() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState([])
  const [oriRows, setOriRows] = useState([])
  const [searched, setSearched] = useState('')
  const [company, setCompany] = useState({
    station: {
      value: 1
    }
  })

  const columns = [
    { id: 'id', label: 'ที่', align: 'center' },
    { id: 'CompanyCode', label: 'รหัส', align: 'center', format: (value) => {
      try {
        if (!!value) {
          return parseInt(value).toLocaleString('en-US', {
            minimumIntegerDigits: 3,
            useGrouping: false
          })
        }
      } catch (error) {
        return value
      }
    }},
    { id: 'StationName', label: 'สถานี', align: 'center' },
    { id: 'CompanyName', label: 'ผู้ประกอบการ', align: 'center' },
    { id: 'TransportLicenseID', label: 'เลขที่ใบอนุญาต', align: 'center' },
    { id: 'TransportTypeID', label: 'ประเภทการขนส่ง', align: 'center', format: (value) => {
      if (!!value) {
        switch (value) {
          case 1: return 'ไม่ประจำทาง'
          break
          case 2: return 'ส่วนบุคคล'
          break
        }
      }
    } },
    { id: 'TransportScopeID', label: 'ขอบเขตพื้นที่', align: 'center', format: (value) => {
      if (!!value) {
        switch (value) {
          case 1: return 'ในประเทศ' 
          break
          case 2: return 'ระหว่างประเทศ'
          break
          case 3: return 'ในประเทศ/ระหว่างประเทศ'
          break
        }
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

  const handleValueChange = (e) => {
    company[e.target.name].value = e.target.value
    setCompany({...company})
  }

  const requestSearch = (e) => {
    setSearched(e.target.value)
    setPage(0)
    const filteredRows = oriRows.filter((row) => {
      return row.CompanyName.toLowerCase().includes(e.target.value.toLowerCase()) || row.TransportLicenseID.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setRows(filteredRows)
  }

  const search = async () => {
    try {
      setLoading(true)
      const data = (await getCompanies(company.station.value)).data
      setRows(data)
      setOriRows(data)
      setPage(0)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const cancel = () => {
    setPage(0)
    setRows([])
  }

  useEffect(() => {
    search()
  }, [])
  

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
                      <BtnClear loading={loading} disabled={loading} onClick={cancel}></BtnClear>
                      <BtnSearch loading={loading} disabled={loading} onClick={search}></BtnSearch>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                      <LoadingButton loading={loading} disabled={loading} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 22, height: 48, background: 'linear-gradient(102.79deg, #F3B922 0%, #A37A10 98.65%)', borderRadius: 3, color: 'white', mx: 1}} color='warning' variant='contained' onClick={() => {navigate('/management/company/0')}}>เพิ่มรายชื่อผู้ประกอบการ</LoadingButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation={2}>
                      <DltSearchBar value={searched} onChange={requestSearch}></DltSearchBar>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    {/* <SearchBar
                      value={searched}
                      onChange={(searchVal) => requestSearch(searchVal)}
                      onCancelSearch={() => cancelSearch()}
                    /> */}
                      <TableContainer sx={{ minHeight: '50vh', maxHeight: '50vh', color: 'white' }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
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
                                    <TableCell align={columns[0].align}>{row.id}</TableCell>
                                    <TableCell align={columns[1].align}>{columns[1].format(row.CompanyCode)}</TableCell>
                                    <TableCell align={columns[2].align}>{row.StationName}</TableCell>
                                    <TableCell align={columns[3].align}>{row.CompanyName}</TableCell>
                                    <TableCell align={columns[4].align}>{row.TransportLicenseID}</TableCell>
                                    <TableCell align={columns[5].align}>{columns[5].format(row.TransportTypeID)}</TableCell>
                                    <TableCell align={columns[6].align}>{columns[6].format(row.TransportScopeID)}</TableCell>
                                    <TableCell align='center'><IconButton color="warning" onClick={() => {navigate('/management/company/' + row.CompanyID)}}><SquareEditOutline/></IconButton></TableCell>
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
          </Stack>
        </Container>
    </Slide>
  )
}

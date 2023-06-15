import { Card, Container, Slide, Box, CardContent, Grid, Stack, IconButton, Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, TablePagination } from '@mui/material'
import React from 'react'
import SelectStation from '../../../components/SelectStation'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { SquareEditOutline } from 'mdi-material-ui'
import SelectCompany from '../../../components/SelectCompany'
import DltTextField from '../../../components/DltTextField'
import { dateTimeFormatter } from '../../../services/utils'
import { getG2Vehicles } from '../../../services/managements'
import BtnClear from '../../../components/BtnClear'
import BtnSearch from '../../../components/BtnSearch'
import { useEffect } from 'react'

export default function G2Vehicle() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])
    const [g2Vehicle, setG2Vehicle] = useState({
        station: {
            value: 1
        },
        company: {
            value: ''
        },
        licensePlate: {
            value: ''
        }
    })

    const columns = [
      { id: 'id', label: 'ที่', align: 'center' },
      { id: 'IsActive', label: 'สถานะ', align: 'center', format: (value) => {
        if (value) {
          return 'เปิดใช้งาน'
        } else {
          return 'ปิดการใช้งาน'
        }
      }},
      { id: 'EntryDate', label: 'บันทึกครั้งแรก', align: 'center', format: (value) => {
        try {
          return dateTimeFormatter(value)
        } catch (error) {
          return error.message
        }
      }},
      { id: 'CompanyName', label: 'ผู้ประกอบการ', align: 'center' },
      { id: 'Description', label: 'ประเภทรถ', align: 'center' },
      { id: 'FrontLP', label: 'ทะเบียนหน้า', align: 'center' },
      { id: 'RearLP', label: 'ทะเบียนหลัง', align: 'center' },
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
        g2Vehicle[e.target.name].value = e.target.value
        setG2Vehicle({...g2Vehicle})
    }

    const search = async () => {
        try {
          setLoading(true)
          setRows([])
          setPage(0)
          setRowsPerPage(10)
          const data = (await getG2Vehicles(g2Vehicle.station.value, g2Vehicle.company.value, g2Vehicle.licensePlate.value)).data
          setRows(data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    
      const cancel = () => {
        setG2Vehicle({
          station: {
              value: 1
          },
          company: {
              value: ''
          },
          licensePlate: {
              value: ''
          }
        })
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
              <div className='dlt-page-title-text-m'>รายการรถลูกค้าของผู้ประกอบการ</div>
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
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                      <TableContainer sx={{ minHeight: '40vh', maxHeight: '40vh', color: 'white' }}>
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
                                    <TableCell align={columns[1].align}>{columns[1].format(row.IsActive)}</TableCell>
                                    <TableCell align={columns[2].align}>{columns[2].format(row.EntryDate)}</TableCell>
                                    <TableCell align={columns[3].align}>{row.CompanyName}</TableCell>
                                    <TableCell align={columns[4].align}>{row.Description}</TableCell>
                                    <TableCell align={columns[5].align}>{row.FrontLP}</TableCell>
                                    <TableCell align={columns[6].align}>{row.RearLP}</TableCell>
                                    <TableCell align='center'><IconButton color="warning" onClick={() => {navigate('/management/g2Vehicle/' + row.G2VehicleID)}}><SquareEditOutline/></IconButton></TableCell>
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

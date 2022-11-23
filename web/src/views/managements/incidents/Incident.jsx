import { Card, Container, Slide, Box, CardContent, Grid, Stack, IconButton, Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, TablePagination } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SquareEditOutline } from 'mdi-material-ui'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import { getIncidents } from '../../../services/managements'
import { dateTimeFormatter } from '../../../services/utils'
import SelectStation from '../../../components/SelectStation'
import DltDateTimePicker from '../../../components/DltDateTimePicker'
import BtnClear from '../../../components/BtnClear'
import BtnAdd from '../../../components/BtnAdd'
import BtnSearch from '../../../components/BtnSearch'

export default function Incident() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState({
        station: {
            value: 1
        },
        startDate: {
            value: moment().startOf('year')
        },
        endDate: {
            value: moment().endOf('year')
        }
    })

    const columns = [
      { id: 'id', label: 'ที่', align: 'center' },
      { id: 'Title', label: 'หัวเรื่อง', align: 'center'},
      { id: 'StationName', label: 'สถานี', align: 'center' },
      { id: 'StartDt', label: 'วัน - เวลา เริ่ม', align: 'center', format: (value) => {
          try {
              if (value) {
                  return dateTimeFormatter(value)
              } else {
                  return '-'
              }
          } catch (error) {
            return '-'
          }
      }},
      { id: 'EndDt', label: 'วัน - เวลา สิ้นสุด', align: 'center', format: (value) => {
          try {
              if (value) {
                  return dateTimeFormatter(value)
              } else {
                  return '-'
              }
          } catch (error) {
            return '-'
          }
      }},
      { id: 'edit', label: 'แก้ไข'}
    ]

    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    }

    const handleChangeValue = (e) => {
        query[e.target.name].value = e.target.value
        setQuery({...query})
    }


    const search = async () => {
        try {
          setLoading(true)
          const data = (await getIncidents(query.station.value, query.startDate.value, query.endDate.value)).data
          setRows(data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      const clear = () => {
        try {
          setLoading(true)
          query.station.value = 1
          query.startDate.value = moment().startOf('year')
          query.endDate.value = moment().endOf('year')
          setQuery({...query})
        } catch (error) {
            console.log(error)
        } finally{
          setLoading(false)
        }
      }

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
          <Stack spacing={2}>
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text'>ข้อมูลเหตุการณ์</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Card sx={{py: 3}}>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                    <Grid item xs={4}>
                        <SelectStation value={query.station.value} name='station' onChange={handleChangeValue}></SelectStation>
                    </Grid>
                    <Grid item xs={4}>
                        <DltDateTimePicker value={query.startDate.value} name='startDate' label='วันที่เริ่มต้น' onChange={(e) => {query.startDate.value = e; setQuery({...query})}}></DltDateTimePicker>
                    </Grid>
                    <Grid item xs={4}>
                        <DltDateTimePicker value={query.endDate.value} name='endDate' label='วันที่สิ้นสุด' onChange={(e) => {query.endDate.value = e; setQuery({...query})}}></DltDateTimePicker>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                          <BtnClear loading={loading} onClick={clear}></BtnClear>
                          <BtnSearch loading={loading} onClick={search}></BtnSearch>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                          <BtnAdd label='เพิ่มเหตุการณ์' onClick={() => {navigate('/management/incidents/0')}}></BtnAdd>
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
                                      <TableCell align={columns[1].align}>{row.Title}</TableCell>
                                      <TableCell align={columns[2].align}>{row.StationName}</TableCell>
                                      <TableCell align={columns[3].align}>{columns[3].format(row.StartDt)}</TableCell>
                                      <TableCell align={columns[4].align}>{columns[4].format(row.EndDt)}</TableCell>
                                      <TableCell align='center'><IconButton color="warning" onClick={() => {navigate('/management/incidents/' + row.ID)}}><SquareEditOutline/></IconButton></TableCell>
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

import { Card, Container, Slide, CardContent, Grid, Stack, IconButton, Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, TablePagination } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SquareEditOutline } from 'mdi-material-ui'
import { getG2VehicleRules } from '../../../services/managements'
import { useEffect } from 'react'
import { dateTimeFormatter } from '../../../services/utils'

export default function G2VehicleRule() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])

    const columns = [
      { id: 'id', label: 'ที่', align: 'center' },
      { id: 'StationName', label: 'สถานี', align: 'center' },
      { id: 'RuleDescription', label: 'เกณฑ์', align: 'center', format: (RuleID, value) => {
        try {
          return '(' + RuleID + ') ' + value
        } catch (error) {
          return error
        }
      }},
      { id: 'TargetDate', label: 'กำหนดวัน - เวลา', align: 'center', format: (value) => {
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
      { id: 'UpdateTimeStamp', label: 'แก้ไขล่าสุด', align: 'center', format: (value) => {
          try {
            return dateTimeFormatter(value)
          } catch (error) {
            return '-'
          }
      }},
      { id: 'LoginName', label: 'โดย', align: 'center' },
      { id: 'edit', label: 'แก้ไข'}
    ]
    
    const search = async () => {
        try {
          setLoading(true)
          const data = (await getG2VehicleRules()).data
          setRows(data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      const handleChangePage = (event, newPage) => {
        setPage(newPage)
      }
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
      }

      useEffect(() => {
        search ()
      }, [])
      
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
          <Stack spacing={2}>
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text'>เกณฑ์การเปิดไม้กั้นโดยอัตโนมัติ ของรถลูกค้าของผู้ประกอบการ</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Card>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
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
                                    <TableCell align={columns[1].align}>{row.StationName}</TableCell>
                                    <TableCell align={columns[2].align}>{columns[2].format(row.RuleID, row.RuleDescription)}</TableCell>
                                    <TableCell align={columns[3].align}>{columns[3].format(row.TargetDate)}</TableCell>
                                    <TableCell align={columns[4].align}>{columns[4].format(row.UpdateTimeStamp)}</TableCell>
                                    <TableCell align={columns[5].align}>{row.LoginName}</TableCell>
                                    <TableCell align='center'><IconButton color="warning" onClick={() => {navigate('/management/g2Vehiclerule/' + row.StationID)}}><SquareEditOutline/></IconButton></TableCell>
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

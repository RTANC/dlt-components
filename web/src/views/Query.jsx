import { Container, Grid, Slide, Card, CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CardActions, Stack, Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, TablePagination, IconButton } from '@mui/material'
import React, { useState } from 'react'
import SelectStation from '../components/SelectStation'
import SelectCompany from '../components/SelectCompany'
import DltDateTimePicker from '../components/DltDateTimePicker'
import SelectProvince from '../components/SelectProvince'
import SelectVehicleClass from '../components/SelectVehicleClass'
import SelectVehicleGroup from '../components/SelectVehicleGroup'
import SelectGoodCategory from '../components/SelectGoodCategory'
import SelectIsConfirm from '../components/SelectIsConfirm'
import CheckBoxVehicleStatus from '../components/CheckBoxVehicleStatus'
import BtnSearch from '../components/BtnSearch'
import BtnClear from '../components/BtnClear'
import DltTextField from '../components/DltTextField'
import moment from 'moment'
import { dateTimeFormatter, null2empty, timeStayIn, getImageURL } from '../services/utils'
import { getTransport, getVehicleIn, getVehicleOut } from '../services/query'
import { SquareEditOutline } from 'mdi-material-ui'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Query() {
  const [loading, setLoading] = useState(false)
  const [stationEditable, setStationEditable] = useState(parseInt(Cookies.get('RoleID')) > 1 ? false : true)
  const [companyEditable, setCompanyEditable] = useState(parseInt(Cookies.get('RoleID')) > 2 ? false : true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const navigate = useNavigate()
  const [params, setParams] = useState({
    queryId: 1,
    station: parseInt(Cookies.get('RoleID')) > 1 ? Cookies.get('StationID') : 1,
    company: Cookies.get('CompanyID'),
    startDateTime: moment().startOf('day'),
    endDateTime: moment().endOf('day'),
    inProvince: '',
    outProvince: '',
    vehicleClass: '',
    vehicleGroup: '',
    goodCategory: '',
    isConfirm: '',
    lp: '',
    isVehicleInStation: false,
    isOverWeight: false
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const columns = [
    { id: 'TimeStampTx', label: 'วัน-เวลา บันทึกข้อมูล', align: 'center', minWidth: 100, format: (value) => {
      try {
        if (!!value) {
          return dateTimeFormatter(value)
        }
      } catch (error) {
        return '-'
      }
    } },
    { id: 'TimeStampIn', label: 'วัน-เวลา เข้า', align: 'center', minWidth: 100, format: (value) => {
      try {
        if (!!value) {
          return dateTimeFormatter(value)
        }
      } catch (error) {
        return ''
      }
    } },
    { id: 'TimeStampOut', label: 'วัน-เวลา ออก', align: 'center', minWidth: 100, format: (value) => {
      try {
        if (!!value) {
          return dateTimeFormatter(value)
        }
      } catch (error) {
        return ''
      }
    } },
    { id: 'CompanyName', label: 'ผู้ประกอบการ', align: 'center', minWidth: 250 },
    { id: 'VehicleClassName', label: 'ประเภทรถ', align: 'center', minWidth: 100 },
    { id: 'VehicleGroupName', label: 'กลุ่มรถ', align: 'center', minWidth: 100 },
    { id: 'F1M', label: 'ทะเบียนหน้าขาเข้า', align: 'center', minWidth: 150, format: (F1M, F1MPName) => {
      try {
        return null2empty(F1M) + ' ' + null2empty(F1MPName)
      } catch (error) {
        return ''
      }
    }},
    { id: 'R1M', label: 'ทะเบียนหลังขาเข้า', align: 'center', minWidth: 150, format: (R1M, R1MPName) => {
      try {
        return null2empty(R1M) + ' ' + null2empty(R1MPName)
      } catch (error) {
        return ''
      }
    }},
    { id: 'F1MIMG0', label: 'ภาพทะเบียนหน้าขาเข้า', align: 'center', maxWidth: 150 },
    { id: 'R1MIMG1', label: 'ภาพทะเบียนหลังขาเข้า', align: 'center', maxWidth: 150 },
    { id: 'F1MIMG2', label: 'ภาพหน้ารถขาเข้า', align: 'center', maxWidth: 150 },
    { id: 'R1MIMG3', label: 'ภาพหลังรถขาเข้า', align: 'center', maxWidth: 150 },
    { id: 'F2A', label: 'ทะเบียนหน้าขาออก', align: 'center', minWidth: 150, format: (F2A, F2APName) => {
      try {
        return null2empty(F2A) + ' ' + null2empty(F2APName)
      } catch (error) {
        return ''
      }
    }},
    { id: 'R2A', label: 'ทะเบียนหลังขาออก', align: 'center', minWidth: 150, format: (R2A, R2APName) => {
      try {
        return null2empty(R2A) + ' ' + null2empty(R2APName)
      } catch (error) {
        return ''
      }
    }},
    { id: 'F2AIMG0', label: 'ภาพทะเบียนหน้าขาออก', align: 'center', maxWidth: 150 },
    { id: 'R2AIMG1', label: 'ภาพทะเบียนหลังขาออก', align: 'center', maxWidth: 150 },
    { id: 'F2AIMG2', label: 'ภาพหน้ารถขาออก', align: 'center', maxWidth: 150 },
    { id: 'R2AIMG3', label: 'ภาพหลังรถขาออก', align: 'center', maxWidth: 150 },
    { id: 'ObjectiveName', label: 'วัตถุประสงค์', align: 'center', minWidth: 150, format: (value) => {
      try {
        if (value !== '') {
          return value
        } else {
          return 'อื่นๆ'
        }
      } catch (error) {
        return ''
      }
    } },
    { id: 'SrcProvinceName', label: 'จังหวัดต้นทาง', align: 'center', minWidth: 150, format: (value) => {
      try {
        if (value !== '' || value !== 'null') {
          return value
        } else {
          return ''
        }
      } catch (error) {
        return ''
      }
    } },
    { id: 'DstProvinceName', label: 'จังหวัดปลายทาง', align: 'center', minWidth: 150, format: (value) => {
      try {
        if (value !== '' || value !== 'null') {
          return value
        } else {
          return ''
        }
      } catch (error) {
        return ''
      }
    } },
    { id: 'NoLoadWt', label: 'นน.รถเปล่า', align: 'center', minWidth: 80 },
    { id: 'LoadWt', label: 'นน.พิกัด', align: 'center', minWidth: 80 },
    { id: 'OverWt', label: 'นน.เกิน', align: 'center', minWidth: 50, format: (value) => {
      try {
        if (value !== '' || value !== 'null') {
          if (value === 0) {
            return 'ไม่'
          } else {
            return 'ใช่'
          }
        } else {
          return ''
        }
      } catch (error) {
        return ''
      }
    }},
    { id: 'IsConfirmed', label: 'ยืนยัน', align: 'center', minWidth: 50 , format: (value) => {
      try {
        if (value !== '' || value !== 'null') {
          if (value === 0) {
            return 'ไม่'
          } else {
            return 'ใช่'
          }
        } else {
          return ''
        }
      } catch (error) {
        return ''
      }
    }},
    { id: 'TimeUse', label: 'เวลาที่ใช้', align: 'center', minWidth: 100, format: (TimeStampIn, TimeStampOut) => {
      try {
        return timeStayIn(TimeStampIn, TimeStampOut)
      } catch (error) {
        return ''
      }
    }},
    { id: 'edit', label: 'แก้ไข'},
    { id: 'print', label: 'พิมพ์'},
  ]

  const [rows, setRows] = useState([])

  const search = async (e) => {
    try {
      setLoading(true)
      let resp = []
      if (params.queryId === 1) {
        resp = (await getTransport(params)).data
      } else if (params.queryId === 2) {
        resp = (await getVehicleIn(params)).data
      } else if (params.queryId === 3) {
        resp = (await getVehicleOut(params)).data
      }
      switch (parseInt(params.queryId)) {
        case 1: resp = (await getTransport(params)).data
          break;
        case 2: resp = (await getVehicleIn(params)).data
          break;
        case 3: resp = (await getVehicleOut(params)).data
          break;
        default: resp = []
          break;
      }
      setRows(resp)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setParams({
      queryId: 1,
      station: parseInt(Cookies.get('RoleID')) > 1 ? Cookies.get('StationID') : 1,
      company: Cookies.get('CompanyID'),
      startDateTime: moment().startOf('day'),
      endDateTime: moment().endOf('day'),
      inProvince: '',
      outProvince: '',
      vehicleClass: '',
      vehicleGroup: '',
      goodCategory: '',
      isConfirm: '',
      lp: '',
      isVehicleInStation: false,
      isOverWeight: false
    })
  }

  const handleChange = (e) => {
    params[e.target.name] = e.target.value
    setParams({...params})
  }

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Container>
        <Stack spacing={2}>
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text'>สืบค้นข้อมูล</div>
              <div className='dlt-page-title-line'></div>
            </div>
          <Card>
            <CardContent>
              <Grid container spacing={2} direction='row' wrap='wrap'>
                <Grid item xs={12}>
                  <FormControl color='warning'>
                    <FormLabel sx={{display: 'flex', alignContent: 'flex-start', fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 20, color: 'white' }}>เลือกข้อมูล</FormLabel>
                    <RadioGroup row value={params.queryId} name='queryId' onChange={handleChange}>
                      <FormControlLabel value={1} control={<Radio />} label="รถที่มีรายการรับส่งสินค้า"></FormControlLabel>
                      <FormControlLabel value={2} control={<Radio />} label="รถทุกคันที่เข้าสถานีฯ"></FormControlLabel>
                      <FormControlLabel value={3} control={<Radio />} label="รถบรรทุกที่ออกจากสถานีฯ"></FormControlLabel>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectStation value={params.station} name='station' disabled={!stationEditable} onChange={handleChange} required></SelectStation>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <DltDateTimePicker value={params.startDateTime} label='วันเวลา-เริ่มต้น' name='startDateTime' onChange={e => {params.startDateTime = e;setParams({...params})}} required maxDateTime={new Date(params.endDateTime)}></DltDateTimePicker>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <DltDateTimePicker value={params.endDateTime} label='วันเวลา-สิ้นสุด' name='endDateTime' onChange={e => {params.endDateTime = e;setParams({...params})}} required minDateTime={new Date(params.startDateTime)}></DltDateTimePicker>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectCompany value={params.company} name='company' onChange={handleChange} station={params.station} disabled={!companyEditable}></SelectCompany>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectProvince value={params.inProvince} label='จังหวัดต้นทาง' name='inProvince' onChange={handleChange}></SelectProvince>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectProvince value={params.outProvince} label='จังหวัดปลายทาง' name='outProvince' onChange={handleChange}></SelectProvince>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectVehicleClass value={params.vehicleClass} name='vehicleClass' label='ประเภทรถ' onChange={handleChange}></SelectVehicleClass>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectGoodCategory value={params.goodCategory} name='goodCategory' label='ประเภทสินค้า' onChange={handleChange}></SelectGoodCategory>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectVehicleGroup value={params.vehicleGroup} name='vehicleGroup' label='กลุ่มรถ' onChange={handleChange}></SelectVehicleGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <SelectIsConfirm value={params.isConfirm} name='isConfirm' label='ยืนยันรายการ' onChange={handleChange}></SelectIsConfirm>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <DltTextField label='ทะเบียนรถ' value={params.lp} name='lp' onChange={handleChange}></DltTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <CheckBoxVehicleStatus isVehicleInStation={params.isVehicleInStation} isOverWeight={params.isOverWeight} onChange={(e) => {setParams({...params, [e.target.name]: e.target.checked})}}></CheckBoxVehicleStatus>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'center', py:3}}>
              <BtnClear loading={loading} onClick={clear}></BtnClear>
              <BtnSearch loading={loading} onClick={search}></BtnSearch>
            </CardActions>
          </Card>
          {/* <Card>
            <CardContent>
              <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick sx={{height: 400, color: 'white'}}/>
            </CardContent>
          </Card> */}
          <Card>
            <CardContent>
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440, color: 'white' }}>
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
                              <TableCell align={columns[0].align}>{columns[0].format(row.TimeStampTx)}</TableCell>
                              <TableCell align={columns[1].align}>{columns[1].format(row.TimeStampIn)}</TableCell>
                              <TableCell align={columns[2].align}>{columns[2].format(row.TimeStampOut)}</TableCell>
                              <TableCell align={columns[3].align}>{row.CompanyName}</TableCell>
                              <TableCell align={columns[4].align}>{row.VehicleClassName}</TableCell>
                              <TableCell align={columns[5].align}>{row.VehicleGroupName}</TableCell>
                              <TableCell align={columns[6].align}>{columns[6].format(row.F1M, row.F1MPName)}</TableCell>
                              <TableCell align={columns[7].align}>{columns[7].format(row.R1M, row.R1MPName)}</TableCell>
                              <TableCell><img src={getImageURL(row.StationID, row.VehInLaneID, row.TimeStampIn, row.VehInImageRef, '0')} width="100" height="100"/></TableCell>
                              <TableCell><img src={getImageURL(row.StationID, row.VehInLaneID, row.TimeStampIn, row.VehInImageRef, '1')} width="100" height="100"/></TableCell>
                              <TableCell><img src={getImageURL(row.StationID, row.VehInLaneID, row.TimeStampIn, row.VehInImageRef, '2')} width="100" height="100"/></TableCell>
                              <TableCell><img src={getImageURL(row.StationID, row.VehInLaneID, row.TimeStampIn, row.VehInImageRef, '3')} width="100" height="100"/></TableCell>
                              <TableCell align={columns[12].align}>{columns[12].format(row.F2A, row.F2APName)}</TableCell>
                              <TableCell align={columns[13].align}>{columns[13].format(row.R2A, row.R2APName)}</TableCell>
                              <TableCell><img src={getImageURL(row.StationID, row.VehOutLaneID, row.TimeStampOut, row.VehOutImageRef, '0')} width="100" height="100"/></TableCell>
                              <TableCell><img src={getImageURL(row.StationID, row.VehOutLaneID, row.TimeStampOut, row.VehOutImageRef, '1')} width="100" height="100"/></TableCell>
                              <TableCell><img src={getImageURL(row.StationID, row.VehOutLaneID, row.TimeStampOut, row.VehOutImageRef, '2')} width="100" height="100"/></TableCell>
                              <TableCell><img src={getImageURL(row.StationID, row.VehOutLaneID, row.TimeStampOut, row.VehOutImageRef, '3')} width="100" height="100"/></TableCell>
                              <TableCell align={columns[18].align}>{columns[18].format(row.ObjectiveName)}</TableCell>
                              <TableCell align={columns[19].align}>{columns[19].format(row.SrcProvinceName)}</TableCell>
                              <TableCell align={columns[20].align}>{columns[20].format(row.DstProvinceName)}</TableCell>
                              <TableCell align={columns[21].align}>{row.NoLoadWt}</TableCell>
                              <TableCell align={columns[22].align}>{row.LoadWt}</TableCell>
                              <TableCell align={columns[23].align}>{columns[23].format(row.OverWt)}</TableCell>
                              <TableCell align={columns[24].align}>{columns[24].format(row.IsConfirmed)}</TableCell>
                              <TableCell align={columns[25].align}>{columns[25].format(row.TimeStampIn, row.TimeStampOut)}</TableCell>
                              <TableCell align='center'><IconButton color="warning" onClick={() => {navigate('/home')}}><SquareEditOutline/></IconButton></TableCell>
                              <TableCell align='center'><IconButton color="warning" onClick={() => {navigate('/home')}}><PrintOutlinedIcon/></IconButton></TableCell>
                              {/* {columns.map((column) => {
                                const value = row[column.id]
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {typeof column.format !== 'undefined' ? column.format(value) : value}
                                  </TableCell>
                                )
                              })} */}
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
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Slide>
  )
}

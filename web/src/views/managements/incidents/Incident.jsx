import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, Stack, IconButton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SquareEditOutline } from 'mdi-material-ui'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment-timezone'
import { getIncidents } from '../../../services/managements'
import { useEffect } from 'react'
import SelectStation from '../../../components/SelectStation'
import DltDateTimePicker from '../../../components/DltDateTimePicker'

export default function Incident() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
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

    const handleChangeValue = (e) => {
        query[e.target.name].value = e.target.value
        setQuery({...query})
    }


    const search = async () => {
        try {
          setLoading(true)
        //   const data = (await getG2VehicleRules()).data
          setRows(data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      const clear = () => {
        try {
            
        } catch (error) {
            console.log(error)
        }
      }

      const columns = [
        { field: 'id', headerName: 'ที่', flex: 0.3 },
        { field: 'Title', headerName: 'หัวเรื่อง', flex: 2, valueGetter: (params) => {
          try {
            return '(' + params.row.RuleID + ') ' + params.value
          } catch (error) {
            return error
          }
        }},
        { field: 'StationName', headerName: 'สถานี', flex: 1 },
        { field: 'StartDt', headerName: 'วัน - เวลา เริ่ม', flex: 1, valueFormatter: (params) => {
            try {
                if (params.value) {
                    return moment(params.value).add(543, 'y').format('DD/MM/YYYY HH:mm:ss')
                } else {
                    return '-'
                }
            } catch (error) {
              return '-'
            }
        }},
        { field: 'EndDt', headerName: 'วัน - เวลา สิ้นสุด', flex: 1, valueFormatter: (params) => {
            try {
                if (params.value) {
                    return moment(params.value).add(543, 'y').format('DD/MM/YYYY HH:mm:ss')
                } else {
                    return '-'
                }
            } catch (error) {
              return '-'
            }
        }},
        {
          field: 'ID',
          headerName: 'แก้ไข',
          sortable: false,
          flex: 0.4,
          type: 'actions',
          renderCell: (params) => (<IconButton color="warning" onClick={() => {navigate('/management/incidents/'+params.value)}}><SquareEditOutline/></IconButton>)
        }
      ]

      useEffect(() => {
      }, [])

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
          <Stack spacing={2}>
            <Card>
              <CardHeader title=' ข้อมูลเหตุการณ์' titleTypographyProps={{variant: 'h5', display: 'flex', justifyContent: 'center'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                    <Grid item xs={4}>
                        <SelectStation value={query.station.value} name='station' onChange={handleChangeValue}></SelectStation>
                    </Grid>
                    <Grid item xs={4}>
                        <DltDateTimePicker value={query.startDate.value} name='startDate' label='วันที่เริ่มต้น' onChange={handleChangeValue}></DltDateTimePicker>
                    </Grid>
                    <Grid item xs={4}>
                        <DltDateTimePicker value={query.endDate.value} name='endDate' label='วันที่สิ้นสุด' onChange={handleChangeValue}></DltDateTimePicker>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'end'}}>
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

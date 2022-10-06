import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, Stack, IconButton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SquareEditOutline } from 'mdi-material-ui'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import { getG2VehicleRules } from '../../../services/managements'
import { useEffect } from 'react'

export default function G2VehicleRule() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
    
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

      const columns = [
        { field: 'id', headerName: 'ที่', flex: 0.3 },
        { field: 'StationName', headerName: 'สถานี', flex: 0.5 },
        { field: 'RuleDescription', headerName: 'เกณฑ์', flex: 2, valueGetter: (params) => {
          try {
            return '(' + params.row.RuleID + ') ' + params.value
          } catch (error) {
            return error
          }
        }},
        { field: 'TargetDate', headerName: 'กำหนดวัน - เวลา', flex: 1, valueFormatter: (params) => {
            try {
                if (params.value) {
                    return moment(params.value).add(543, 'y').format('DD/MM/YYYY')
                } else {
                    return '-'
                }
            } catch (error) {
              return '-'
            }
        }},
        { field: 'UpdateTimeStamp', headerName: 'แก้ไขล่าสุด', flex: 1, valueFormatter: (params) => {
            try {
              return moment(params.value).add(543, 'y').format('DD/MM/YYYY HH:mm:ss')
            } catch (error) {
              return '-'
            }
        }},
        { field: 'LoginName', headerName: 'โดย', flex: 1 },
        {
          field: 'StationID',
          headerName: 'แก้ไข',
          sortable: false,
          flex: 0.4,
          type: 'actions',
          renderCell: (params) => (<IconButton color="warning" onClick={() => {navigate('/management/g2Vehiclerule/'+params.value)}}><SquareEditOutline/></IconButton>)
        }
      ]

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
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        sx={{minHeight: '500px', width: '100%'}}
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

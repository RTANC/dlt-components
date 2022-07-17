import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, Stack, CardActions, Divider } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment-timezone'
import { getIncident } from '../../../services/managements'
import { useEffect } from 'react'
import SelectStation from '../../../components/SelectStation'
import DltDateTimePicker from '../../../components/DltDateTimePicker'
import BtnBack from '../../../components/BtnBack'
import BtnSave from '../../../components/BtnSave'
import DltTextField from '../../../components/DltTextField'
import BtnDelete from '../../../components/BtnDelete'

export default function IncidentForm() {
  const navigate = useNavigate()
  const { incidentId } = useParams()
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [incident, setIncident] = useState({
        station: {
          value: 1
        },
        startDate: {
          value: moment().startOf('year')
        },
        endDate: {
          value: moment().endOf('year')
        },
        title: {
          value: ''
        },
        description: {
          value: ''
        },
        remark: {
          value: ''
        }
    })

    const handleChangeValue = (e) => {
        incident[e.target.name].value = e.target.value
        setIncident({...incident})
    }


    const save = async () => {
        try {
          setLoading(true)

        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      const init = async () => {
        try {
          const data = (await getIncident(incidentId)).data
          incident.station.value = data.StationID
          incident.startDate.value = data.StartDt
          incident.endDate.value = data.EndDt
          incident.title.value = data.Title
          incident.description.value = !(data.Description) ? data.Description : ''
          incident.remark.value = !(data.Remark) ? data.Remark : ''
          setIncident({...incident})
        } catch (error) {
          console.log(error)
        }
      }


      useEffect(() => {
        if (incidentId === '0') {
          setEditMode(false)
        } else {
          setEditMode(true)
          init()
        }
      }, [])

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
          <Stack spacing={2}>
            <Card>
              <CardHeader title='เพิ่มข้อมูลเหตุการณ์' titleTypographyProps={{variant: 'h5', display: 'flex', justifyContent: 'center'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{width: '33%'}}>
                      <SelectStation value={incident.station.value} name='station' onChange={handleChangeValue} required></SelectStation>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <DltDateTimePicker value={incident.startDate.value} name='startDate' label='วันที่เริ่มต้น' onChange={(e) => {incident.startDate.value = e; setIncident({...incident})}} required></DltDateTimePicker>
                  </Grid>
                  <Grid item xs={6}>
                    <DltDateTimePicker value={incident.endDate.value} name='endDate' label='วันที่สิ้นสุด' onChange={(e) => {incident.endDate.value = e; setIncident({...incident})}} required></DltDateTimePicker>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider></Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <DltTextField value={incident.title.value} name='title' label='หัวเรื่อง' onChange={handleChangeValue} required></DltTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <DltTextField value={incident.description.value} name='description' label='รายละเอียด' onChange={handleChangeValue}></DltTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <DltTextField value={incident.remark.value} name='remark' label='หมายเหตุ' onChange={handleChangeValue}></DltTextField>
                  </Grid>
                  {editMode && <Grid item xs={12}>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                      <BtnDelete loading={loading} label='ลบเหตุการณ์'></BtnDelete>
                    </Box>
                  </Grid>}
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardActions>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <BtnBack></BtnBack>
                  <BtnSave></BtnSave>
                </Box>
              </CardActions>
            </Card>
          </Stack>
        </Container>
    </Slide>
  )
}

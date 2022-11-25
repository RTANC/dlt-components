import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, Stack, CardActions, Divider } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { createIncident, deleteIncident, getIncident, updateIncident } from '../../../services/managements'
import { useEffect } from 'react'
import SelectStation from '../../../components/SelectStation'
import DltDateTimePicker from '../../../components/DltDateTimePicker'
import BtnBack from '../../../components/BtnBack'
import BtnSave from '../../../components/BtnSave'
import DltTextField from '../../../components/DltTextField'
import BtnDelete from '../../../components/BtnDelete'
import formValidator, {validator} from '../../../services/validator'
import { getKeyValue } from '../../../services/utils'

export default function IncidentForm() {
  const navigate = useNavigate()
  const { incidentId } = useParams()
    const [loading, setLoading] = useState(false)
    const [valid, setValid] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [incident, setIncident] = useState({
        station: {
          value: 1,
          rules: [(v) => !!v || '*ข้อมูลจำเป็น']
        },
        startDate: {
          value: moment().startOf('day'),
          rules: [(v) => !!v || '*ข้อมูลจำเป็น']
        },
        endDate: {
          value: moment().endOf('day'),
          rules: [(v) => !!v || '*ข้อมูลจำเป็น']
        },
        title: {
          value: '',
          error: false,
          rules: [(v) => !!v || '*ข้อมูลจำเป็น']
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

    const handleValidateValue = (e) => {
      // incident[e.target.name].error = validator(e.target.value, incident[e.target.name].rules)
      // setIncident({...incident})
      setValid(formValidator(incident, setIncident))
    }


    const save = async () => {
        try {
          setLoading(true)
          if (formValidator(incident, setIncident)) {
            if (!editMode) {
              await createIncident(getKeyValue(incident))
            }else {
              await updateIncident(incidentId, getKeyValue(incident))
            }
            navigate(-1)
          }
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      const del = async () => {
        try {
          setLoading(true)
          await deleteIncident(incidentId)
          navigate(-1)
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
          incident.startDate.value = moment(data.StartDt).utc().format('YYYY-MM-DDTHH:mm:ss')
          incident.endDate.value = moment(data.EndDt).utc().format('YYYY-MM-DDTHH:mm:ss')
          incident.title.value = data.Title
          incident.description.value = data.Description
          incident.remark.value = data.Remark
          setIncident({...incident})
          setValid(formValidator(incident, setIncident))
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
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text'>เพิ่มข้อมูลเหตุการณ์</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Card>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <SelectStation value={incident.station.value} name='station' onChange={handleChangeValue} required></SelectStation>
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
                    <DltTextField value={incident.title.value} name='title' label='หัวเรื่อง' onChange={handleChangeValue} required error={incident.title.error} onKeyUp={handleValidateValue}></DltTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <DltTextField value={incident.description.value} name='description' label='รายละเอียด' onChange={handleChangeValue}></DltTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <DltTextField value={incident.remark.value} name='remark' label='หมายเหตุ' onChange={handleChangeValue}></DltTextField>
                  </Grid>
                  {editMode && <Grid item xs={12}>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                      <BtnDelete loading={loading} label='ลบเหตุการณ์' onClick={del}></BtnDelete>
                    </Box>
                  </Grid>}
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardActions>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', py: 2}}>
                  <BtnBack loading={loading}></BtnBack>
                  <BtnSave loading={loading} onClick={save} disabled={!valid}></BtnSave>
                </Box>
              </CardActions>
            </Card>
          </Stack>
        </Container>
    </Slide>
  )
}

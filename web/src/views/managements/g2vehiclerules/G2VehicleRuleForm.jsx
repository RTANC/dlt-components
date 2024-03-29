import { Card, CardActions, Container, Slide, Box, CardContent, Grid, Stack } from '@mui/material'
import React from 'react'
import SelectStation from '../../../components/SelectStation'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BtnBack from '../../../components/BtnBack'
import BtnSave from '../../../components/BtnSave'
import { useEffect } from 'react'
import SelectG2VehicleRules from '../../../components/SelectG2VehicleRules'
import { getG2VehicleRule, updateG2VehicleRule } from '../../../services/managements'

export default function G2VehicleRuleForm() {
  const navigate = useNavigate()
  const { stationId } = useParams()
  const [loading, setLoading] = useState(false)
  const [g2VehicleRule, setG2VehicleRule] = useState({
    station: {
      value: ''
    },
    rule: {
      value: ''
    }
  })

  const handleChangeValue = (e) => {
    g2VehicleRule[e.target.name].value = e.target.value
    setG2VehicleRule({...g2VehicleRule})
  }
  const save = async () => {
    try {
      setLoading(true)
      await updateG2VehicleRule(g2VehicleRule.station.value, {rule: g2VehicleRule.rule.value})
      navigate(-1)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }
  const init = async () => {
    try {
      const data = (await getG2VehicleRule(stationId)).data
      g2VehicleRule.station.value = data.StationID
      g2VehicleRule.rule.value = data.RuleID
      setG2VehicleRule({...g2VehicleRule})
    } catch (error) {
      
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
          <Stack spacing={2}>
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text-vl'>แก้ไขเกณฑ์การเปิดไม้กั้นโดยอัตโนมัติ ของรถลูกค้าของผู้ประกอบการ</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Card>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12}>
                    <SelectStation value={g2VehicleRule.station.value} name='station' onChange={handleChangeValue} readOnly></SelectStation>
                  </Grid>
                  <Grid item xs={12}>
                    <SelectG2VehicleRules value={g2VehicleRule.rule.value} name='rule' onChange={handleChangeValue} required></SelectG2VehicleRules>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardActions>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', py: 2}}>
                  <BtnBack loading={loading}></BtnBack>
                  <BtnSave loading={loading} onClick={save}></BtnSave>
                </Box>
              </CardActions>
            </Card>
          </Stack>
        </Container>
    </Slide>
  )
}

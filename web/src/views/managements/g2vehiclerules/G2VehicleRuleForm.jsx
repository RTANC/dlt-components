import { Card, CardHeader, CardActions, Container, Slide, Box, CardContent, Grid, Stack, IconButton, Divider } from '@mui/material'
import React from 'react'
import SelectStation from '../../../components/SelectStation'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BtnBack from '../../../components/BtnBack'
import BtnSubmit from '../../../components/BtnSubmit'
import { useEffect } from 'react'
import SelectG2VehicleRules from '../../../components/SelectG2VehicleRules'
import { getG2Rule } from '../../../services/managements'

export default function G2VehicleRuleForm() {
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
      
    } catch (error) {
      
    }
  }
  const init = async () => {
    try {
      const data = (await getG2Rule(stationId)).data
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
            <Card>
              <CardHeader title='แก้ไขเกณฑ์การเปิดไม้กั้นโดยอัตโนมัติ ของรถลูกค้าของผู้ประกอบการ' titleTypographyProps={{variant: 'h5', display: 'flex', justifyContent: 'center'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12}>
                    <SelectStation value={g2VehicleRule.station.value} name='station' onChange={handleChangeValue}></SelectStation>
                  </Grid>
                  <Grid item xs={12}>
                    <SelectG2VehicleRules value={g2VehicleRule.rule.value} name='rule' onChange={handleChangeValue} required></SelectG2VehicleRules>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardActions>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <BtnBack loading={loading}></BtnBack>
                  <BtnSubmit loading={loading} onClick={save}></BtnSubmit>
                </Box>
              </CardActions>
            </Card>
          </Stack>
        </Container>
    </Slide>
  )
}

import { Card, Container, Slide, Box, CardContent, Grid, Stack } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import SelectStation from '../../components/SelectStation'
import SelectCompany from '../../components/SelectCompany'
import BtnClear from '../../components/BtnClear'
import BtnSearch from '../../components/BtnSearch'
import moment from 'moment'
import DltMonthYearPicker from '../../components/DltMonthYearPicker'
import jsreport from '@jsreport/browser-client'
jsreport.headers['Authorization'] = 'Basic ' + btoa(import.meta.env.VITE_JSREPORT_USERNAME + ':' + import.meta.env.VITE_JSREPORT_PASSWORD)
jsreport.serverUrl = import.meta.env.VITE_JSREPORT_URL + ':5489'

export default function GCS06() {
  const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState({
        station: {
            value: 1
        },
        company: {
            value: ''
        },
        date: {
            value: moment()
        }
    })

    const handleChangeValue = (e) => {
        query[e.target.name].value = e.target.value
        setQuery({...query})
    }

    const search = async () => {
        try {
          setLoading(true)
          // const report = await jsreport.render({ template: { shortid: 'stkaBVCjZ_' }, data: this.info })
          const report = await jsreport.render({ template: { shortid: 'nIqn2H_1Dm' } })
          report.openInWindow({ title: 'GCS06', filename: 'GCS06.pdf' })
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
          query.company.value = ''
          query.date.value = moment()
          setQuery({...query})
        } catch (error) {
            console.log(error)
        } finally{
          setLoading(false)
        }
      }
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container sx={{height: '100vh'}}>
          <Stack spacing={2}>
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text'>GCS06 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายวัน</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Card>
                <CardContent>
                  <Grid container spacing={2} direction='row' wrap='wrap'>
                        <Grid item xs={6}>
                            <SelectStation value={query.station.value} name='station' onChange={handleChangeValue} required></SelectStation>
                        </Grid>
                        <Grid item xs={6}>
                            <SelectCompany value={query.company.value} name='company' onChange={handleChangeValue} station={query.station.value}></SelectCompany>
                        </Grid>
                        <Grid item xs={6}>
                            <DltMonthYearPicker  value={query.date.value} name='date' label='ข้อมูลใน เดือน/ปี' onChange={(e) => {query.date.value = e; setQuery({...query})}} required></DltMonthYearPicker>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                              <BtnClear loading={loading} onClick={clear}></BtnClear>
                              <BtnSearch loading={loading} onClick={search} label='ตกลง'></BtnSearch>
                            </Box>
                        </Grid>
                  </Grid>
                </CardContent>
            </Card>
          </Stack>
        </Container>
    </Slide>
  )
}

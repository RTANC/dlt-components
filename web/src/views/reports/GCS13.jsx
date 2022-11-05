import { Card, Container, Slide, Box, CardContent, Grid, Stack } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import SelectStation from '../../components/SelectStation'
import DltDateTimePicker from '../../components/DltDateTimePicker'
import BtnClear from '../../components/BtnClear'
import BtnSearch from '../../components/BtnSearch'
import moment from 'moment'
import jsreport from '@jsreport/browser-client'
jsreport.headers['Authorization'] = 'Basic ' + btoa(import.meta.env.VITE_JSREPORT_USERNAME + ':' + import.meta.env.VITE_JSREPORT_PASSWORD)
jsreport.serverUrl = import.meta.env.VITE_JSREPORT_URL + ':5490'

export default function GCS13() {
  const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState({
        station: {
            value: 1
        },
        startDate: {
            value: moment().startOf('day')
        },
        endDate: {
            value: moment().endOf('day')
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
          const report = await jsreport.render({ template: { shortid: 'cgwMColChR' } })
          report.openInWindow({ title: 'GCS13', filename: 'GCS13.pdf' })
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
          query.startDate.value = moment().startOf('day')
          query.endDate.value = moment().endOf('day')
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
              <div className='dlt-page-title-text' style={{fontSize: 30}}>GCS13 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามประเภทรถ (ข้อมูลบันทึกโดยอัตโนมัติ)</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Card>
                <CardContent>
                  <Grid container spacing={2} direction='row' wrap='wrap'>
                        <Grid item xs={12}>
                            <SelectStation value={query.station.value} name='station' onChange={handleChangeValue} required></SelectStation>
                        </Grid>
                        <Grid item xs={6}>
                            <DltDateTimePicker value={query.startDate.value} name='startDate' label='วันที่เริ่มต้น' onChange={(e) => {query.startDate.value = e; setQuery({...query})}} required></DltDateTimePicker>
                        </Grid>
                        <Grid item xs={6}>
                            <DltDateTimePicker value={query.endDate.value} name='endDate' label='วันที่สิ้นสุด' onChange={(e) => {query.endDate.value = e; setQuery({...query})}} required></DltDateTimePicker>
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

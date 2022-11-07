import { Card, Container, Slide, Box, CardContent, Grid, Stack } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import SelectStation from '../../components/SelectStation'
import SelectCompany from '../../components/SelectCompany'
import DltDateTimePicker from '../../components/DltDateTimePicker'
import BtnClear from '../../components/BtnClear'
import BtnSearch from '../../components/BtnSearch'
import moment from 'moment'
import { getReports } from '../../services/reports'

export default function GCS17() {
  const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState({
        station: {
            value: 1
        },
        company: {
            value: ''
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
          const fileURL = await getReports('17')
          window.open(fileURL)
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
              <div className='dlt-page-title-text' style={{fontSize: 32}}>GCS17 รายงานการคำนวณต้นทุนการขนส่งที่ลดลงได้จากการใช้งานสถานีขนส่งสินค้า</div>
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

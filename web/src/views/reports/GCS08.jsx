import { Card, Container, Slide, Box, CardContent, Grid, Stack } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import SelectStation from '../../components/SelectStation'
import SelectCompany from '../../components/SelectCompany'
import BtnClear from '../../components/BtnClear'
import BtnSearch from '../../components/BtnSearch'
import moment from 'moment'
import DltYearPicker from '../../components/DltYearPicker'
import { getReports } from '../../services/reports'
import { getKeyValue } from '../../services/utils'
import Cookies from 'js-cookie'

export default function GCS08() {
  const [loading, setLoading] = useState(false)
  const [stationEditable, setStationEditable] = useState(parseInt(Cookies.get('RoleID')) > 1 ? false : true)
  const [companyEditable, setCompanyEditable] = useState(parseInt(Cookies.get('RoleID')) > 2 ? false : true)
    const [query, setQuery] = useState({
        station: {
            value: parseInt(Cookies.get('RoleID')) > 1 ? Cookies.get('StationID') : 1
        },
        company: {
            value: parseInt(Cookies.get('RoleID')) > 1 ? Cookies.get('CompanyID') : ''
        },
        startYear: {
            value: moment()
        },
        endYear: {
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
          const fileURL = await getReports('08', getKeyValue(query))
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
          query.startYear.value = moment()
          query.endYear.value = moment()
          setQuery({...query})
        } catch (error) {
            console.log(error)
        } finally{
          setLoading(false)
        }
      }
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
          <Stack spacing={2}>
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text-l'>GCS08 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายปี</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Card>
                <CardContent>
                  <Grid container spacing={2} direction='row' wrap='wrap'>
                        <Grid item xs={6}>
                            <SelectStation value={query.station.value} name='station' onChange={handleChangeValue} required disabled={!stationEditable}></SelectStation>
                        </Grid>
                        <Grid item xs={6}>
                            <SelectCompany value={query.company.value} name='company' onChange={handleChangeValue} station={query.station.value} disabled={!companyEditable}></SelectCompany>
                        </Grid>
                        <Grid item xs={6}>
                            <DltYearPicker value={query.startYear.value} name='startYear' label='ปีงบประมาณเริ่มต้น' onChange={(e) => {query.startYear.value = e; setQuery({...query})}} required></DltYearPicker>
                        </Grid>
                        <Grid item xs={6}>
                            <DltYearPicker value={query.endYear.value} name='endYear' label='ปีงบประมาณสิ้นสุด' onChange={(e) => {query.endYear.value = e; setQuery({...query})}} required></DltYearPicker>
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

import { Card, CardHeader, Container, Slide, Box, CardContent, Grid } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import CachedIcon from '@mui/icons-material/Cached'
import SelectUserRole from '../../../components/SelectUserRole'
import SelectStation from '../../../components/SelectStation'
import DltTextField from '../../../components/DltTextField'
import { LoadingButton } from '@mui/lab'

export default function User() {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    userRole: 3,
    station: 1,
    dept: '',
    text: ''
  })

  const search = async () => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }

  const cancel = () => {

  }
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container maxWidth="false">
            <Card>
                <CardHeader title={<Box sx={{display: 'flex',alignItems: 'center' }}><SearchIcon/> ข้อมูลผู้ใช้งาน</Box>} titleTypographyProps={{variant: 'h6', align: 'left'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
                <CardContent>
                  <Grid container spacing={2} direction='row' wrap="wrap">
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <SelectUserRole value={query.userRole} onChange={(e) => {setQuery({...query, userRole: e.target.value})}}></SelectUserRole>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <SelectStation value={query.station} onChange={(e) => {setQuery({...query, station: e.target.value})}}></SelectStation>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <DltTextField label='ชื่อ/นามสกุล/UserName' value={query.text} onChange={(e) => {setQuery({...query, text: e.target.value})}}></DltTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{width: '100%', alignContent: 'center'}}>
                        <LoadingButton loading={loading} sx={{mx: 1}} color='primary' variant='contained' onClick={search} startIcon={<SearchIcon></SearchIcon>}>ค้นหา</LoadingButton>
                        <LoadingButton loading={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={cancel} startIcon={<CachedIcon/>}>ยกเลิก</LoadingButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12}></Grid>
                  </Grid>
                </CardContent>
            </Card>
        </Container>
    </Slide>
  )
}

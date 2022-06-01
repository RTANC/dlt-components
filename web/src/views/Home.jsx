import { Container, Grid, Slide, Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import SelectStation from '../components/SelectStation'
import SelectCompany from '../components/SelectCompany'
export default function Home() {
  const [transport, setTransport] = useState({
    station: '',
    company: ''
  })

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
    <Container maxWidth="false">
      <Grid
        container
        spacing={1}
        direction="row"
        wrap="wrap"
      >
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{backgroundColor: '#eeeeee'}}>
            <Typography variant="h6" align="left" >
              ข้อมูลผู้บันทึก
            </Typography>
            </CardContent>
            <CardContent>
              <Grid container spacing={2} direction='row' wrap='wrap'>
                <Grid item xs={12} sm={6} md={6}>
                  <SelectStation value={transport.station} name='station' onChange={(e) => {setTransport({...transport,'station': e.target.value})}}></SelectStation>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <SelectCompany value={transport.company} name='company' onChange={(e) => {setTransport({...transport,'company': e.target.value})}}></SelectCompany>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{backgroundColor: '#eeeeee'}}>
              <Typography variant="h6" align="left" >
                ข้อมูลรถบรรทุก
              </Typography>
            </CardContent>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
        <Card>
            <CardContent sx={{backgroundColor: '#eeeeee'}}>
              <Typography variant="h6" align="left" >
                สินค้า
              </Typography>
            </CardContent>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </Slide>
  )
}

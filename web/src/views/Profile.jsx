import { CardHeader, Container, Slide, Grid, Card, Typography, Box, CardContent } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import DltTextField from '../components/DltTextField'

export default function Profile() {
    const [profile, setProfile] = useState({
        useRole: 'ผู้ดูแลระบบ'
    })
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container maxWidth="false">
            <Card>
                <CardHeader title={<Box sx={{display: 'flex',alignItems: 'center' }}><SearchIcon/> แก้ไขข้อมูลผู้ใช้</Box>} titleTypographyProps={{variant: 'h6', align: 'left'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
                <CardContent>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      alignContent="center"
                      wrap="wrap"
                      
                    >
                      <Grid item xs={6}>
                          <DltTextField value={profile.useRole} disabled label='กลุ่มผู้ใช้งาน'></DltTextField>
                      </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    </Slide>
  )
}

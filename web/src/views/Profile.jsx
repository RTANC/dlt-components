import { CardHeader, Container, Slide, Grid, Card, Typography, Box, CardContent, FormControl, FormGroup, FormControlLabel, Checkbox, CardActions } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import DltTextField from '../components/DltTextField'
import SelectTitle from '../components/SelectTitle'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import {validator} from '../services/validator'

export default function Profile() {
  const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({
        useRole: 'กลุ่มผู้ใช้ระดับผู้ประกอบการ',
        title: 1,
        firstname: {
          value: 'admin',
          rules: [],
          error: false
        },
        lastname: {
          value: 'gcs',
          rules: [],
          error: false
        },
        username: {
          value: 'admin',
          rules: [],
          error: false
        },
        chpasswd: false,
        newPassword: {
          value: '',
          rules: [],
          error: false
        },
        confirmPassword: {
          value: '',
          rules: [],
          error: false
        },
        email: {
          value: 'warawit8@gmail.com',
          rules: [],
          error: false
        },
        tel: {
          value: '0804224893',
          rules: [],
          error: false
        }
    })

    profile.firstname.rules = [!!profile.firstname.value || '*ข้อมูลจำเป็น']
    profile.lastname.rules = [!!profile.lastname.value || '*ข้อมูลจำเป็น']
    profile.username.rules = [!!profile.username.value || '*ข้อมูลจำเป็น']
    profile.newPassword.rules = [!!profile.newPassword.value || '*ข้อมูลจำเป็น']
    profile.confirmPassword.rules = [!!profile.confirmPassword.value || '*ข้อมูลจำเป็น']
    profile.email.rules = [!!profile.email.value || '*ข้อมูลจำเป็น', /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profile.email.value) || '*รูปแบบ email ไม่ถูกต้อง']
    profile.tel.rules = [!!profile.tel.value || '*ข้อมูลจำเป็น']

    const handleFirstName = (e) => {
      profile.firstname.value = e.target.value
      setProfile({...profile, firstname: {...profile.firstname}})
    }

    const handleLastName = (e) => {
      profile.lastname.value = e.target.value
      setProfile({...profile, lastname: {...profile.lastname}})
    }

    const handleUsername = (e) => {
      profile.username.value = e.target.value
      setProfile({...profile})
    }

    const handleChpasswd = (e) => {
      if (e.target.checked) {
        profile.newPassword.rules = [!!profile.newPassword.value || '*ข้อมูลจำเป็น']
        profile.confirmPassword.rules = [!!profile.confirmPassword.value || '*ข้อมูลจำเป็น']
      } else {
        profile.newPassword.value = ''
        profile.newPassword.rules = []
        profile.newPassword.error = false
        profile.confirmPassword.value = ''
        profile.confirmPassword.rules = []
        profile.confirmPassword.error = false
      }
      setProfile({...profile, chpasswd: e.target.checked})
    }

    const handleNewPassword = (e) => {
      profile.newPassword.value = e.target.value
      setProfile({...profile})
    }

    const handleConfirmPassword = (e) => {
      profile.confirmPassword.value = e.target.value
      setProfile({...profile})
    }

    const handleEmail = (e) => {
      profile.email.value = e.target.value
      setProfile({...profile})
    }

    const handleTel = (e) => {
      profile.tel.value = e.target.value
      setProfile({...profile})
    }

    const submit = async (e) => {
      try {
        e.preventDefault()
        setLoading(true)

        console.log(profile)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    const cancel = () => {

    }

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container maxWidth="false">
            <Card>
                <CardHeader title={<Box sx={{display: 'flex',alignItems: 'center' }}><SearchIcon/> แก้ไขข้อมูลผู้ใช้</Box>} titleTypographyProps={{variant: 'h6', align: 'left'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
                <CardContent>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      wrap="wrap"

                    >
                      <Grid item xs={12}>
                          <DltTextField value={profile.useRole} disabled label='กลุ่มผู้ใช้งาน'></DltTextField>
                      </Grid>
                      <Grid item xs={4} sm={4} md={2} lg={2}>
                        <SelectTitle value={profile.title} onChange={(e) => {setProfile({...profile, title: e.target.value})}} name='title'></SelectTitle>
                      </Grid>
                      <Grid item xs={4} sm={4} md={5} lg={5}>
                        <DltTextField label='ชื่อ' value={profile.firstname.value} onChange={handleFirstName} onKeyUp={(e) => {setProfile({...profile, firstname: {...profile.firstname, error: validator(profile.firstname.rules)}})}} error={profile.firstname.error} required></DltTextField>
                      </Grid>
                      <Grid item xs={4} sm={4} md={5} lg={5}>
                        <DltTextField label='นามสกุล' value={profile.lastname.value} onChange={handleLastName} onKeyUp={(e) => {setProfile({...profile, lastname: {...profile.lastname, error: validator(profile.firstname.rules)}})}} error={profile.lastname.error} required></DltTextField>
                      </Grid>
                      <Grid item xs={8} md={7}>
                        <DltTextField label='User Name' value={profile.username.value} onChange={handleUsername} onKeyUp={(e) => {setProfile({...profile, username: {...profile.username, error: validator(profile.username.rules)}})}} error={profile.username.error} required></DltTextField>
                      </Grid>
                      <Grid item xs={4} md={5}>
                        <FormControl fullWidth>
                          <FormGroup>
                            <FormControlLabel label='เปลี่ยน Password' control={<Checkbox checked={profile.chpasswd} onChange={handleChpasswd}></Checkbox>}></FormControlLabel>
                          </FormGroup>
                        </FormControl>
                      </Grid>
                      {profile.chpasswd && (<Grid item xs={6} md={6}>
                        <DltTextField type='password' label='Password ใหม่' value={profile.newPassword.value} onChange={handleNewPassword} onKeyUp={(e) => {setProfile({...profile, newPassword: {...profile.newPassword, error: validator(profile.newPassword.rules)}})}} error={profile.newPassword.error} required></DltTextField>
                      </Grid>)}
                      {profile.chpasswd && (<Grid item xs={6} md={6}>
                        <DltTextField type='password' label='ยืนยัน Password ใหม่' value={profile.confirmPassword.value} onChange={handleConfirmPassword} onKeyUp={(e) => {setProfile({...profile, confirmPassword: {...profile.confirmPassword, error: validator(profile.confirmPassword.rules)}})}} error={profile.confirmPassword.error} required></DltTextField>
                      </Grid>)}
                      <Grid item xs={6} md={6}>
                        <DltTextField type='email' label='Email Address' value={profile.email.value} onChange={handleEmail} onKeyUp={(e) => {setProfile({...profile, email: {...profile.email, error: validator(profile.email.rules)}})}} error={profile.email.error} required></DltTextField>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <DltTextField type='number' label='เบอร์โทรติดต่อ' value={profile.tel.value} onChange={handleTel} onKeyUp={(e) => {setProfile({...profile, tel: {...profile.tel, error: validator(profile.tel.rules)}})}} error={profile.tel.error} required></DltTextField>
                      </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                  <Box sx={{width: '100%', alignContent: 'center'}}>
                    <LoadingButton loading={loading} sx={{mx: 1}} color='primary' variant='contained' onClick={submit} startIcon={<SaveIcon></SaveIcon>}>บันทึก</LoadingButton>
                    <LoadingButton loading={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={cancel} startIcon={<CancelIcon></CancelIcon>}>ยกเลิก</LoadingButton>
                  </Box>
                </CardActions>
            </Card>
        </Container>
    </Slide>
  )
}

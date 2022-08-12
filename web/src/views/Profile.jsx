import { CardHeader, Container, Slide, Grid, Card, Typography, Box, CardContent, FormControl, FormGroup, FormControlLabel, Checkbox, CardActions, Stack, Divider } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import DltTextField from '../components/DltTextField'
import SelectTitle from '../components/SelectTitle'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import formValidator, {validator} from '../services/validator'
import {passwordValidator, emailValidator} from '../services/utils'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ContactsIcon from '@mui/icons-material/Contacts'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import KeyIcon from '@mui/icons-material/Key'
import CallIcon from '@mui/icons-material/Call'
import DltPasswordTextField from '../components/DltPasswordTextField'
import BtnSave from '../components/BtnSave'

export default function Profile() {
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(false)
    const [profile, setProfile] = useState({
        userRole: {
          value: 'กลุ่มผู้ใช้ระดับผู้ประกอบการ'
        },
        title: {
          value: 1
        },
        firstname: {
          value: 'admin',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น'],
          error: false
        },
        lastname: {
          value: 'gcs',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น'],
          error: false
        },
        username: {
          value: 'admin',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น'],
          error: false
        },
        newPassword: {
          value: '',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น', (v) => passwordValidator(v) || '*รปแบบ Password ไม่เป็นไปตามรูปแบบที่กำหนด'],
          error: false
        },
        confirmPassword: {
          value: '',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น', (v) => passwordValidator(v) || '*รปแบบ Password ไม่เป็นไปตามรูปแบบที่กำหนด'],
          error: false
        },
        email: {
          value: 'warawit8@gmail.com',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น',  (v) => emailValidator(v) || '*รูปแบบ email ไม่ถูกต้อง'],
          error: false
        },
        tel: {
          value: '0804224893',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น'],
          error: false
        }
    })

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

    const handleValueChange = (e) => {
      profile[e.target.name].value = e.target.value
      setProfile({...profile})
    }

    const handleValidateValue = (e) => {
      setValid(formValidator(profile, setProfile))
    }

    const handleValidatePassword = (e) => {
      setValid(formValidator(profile, setProfile))
      if (profile.newPassword.value === profile.confirmPassword.value) {
        profile.newPassword.error = false
        profile.confirmPassword.error = false
      } else if (profile.newPassword.value !== profile.confirmPassword.value) {
        profile.newPassword.error = 'Password ไม่ตรงกัน'
        profile.confirmPassword.error = 'Password ไม่ตรงกัน'
        setValid(false)
        setProfile({...profile})
      }
    }

    const submit = async (e) => {
      try {
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
        <Container>
          <Stack spacing={2}>
            <Card>
                <CardHeader title='ข้อมูลผู้ใช้งาน' titleTypographyProps={{variant: 'h5', display: 'flex', justifyContent: 'center'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
                <CardContent>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      wrap="wrap"

                    >
                      <Grid item xs={12}>
                        <DltTextField value={profile.userRole.value} name='userRole' disabled label='กลุ่มผู้ใช้งาน'></DltTextField>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider></Divider>
                      </Grid>
                      <Grid item xs={4} sm={4} md={2} lg={2}>
                        <SelectTitle value={profile.title.value} name='title' onChange={handleValueChange} ></SelectTitle>
                      </Grid>
                      <Grid item xs={4} sm={4} md={5} lg={5}>
                        <DltTextField name='firstname' label='ชื่อ' value={profile.firstname.value} onChange={handleValueChange} onKeyUp={handleValidateValue} error={profile.firstname.error} required></DltTextField>
                      </Grid>
                      <Grid item xs={4} sm={4} md={5} lg={5}>
                        <DltTextField name='lastname' label='นามสกุล' value={profile.lastname.value} onChange={handleValueChange} onKeyUp={handleValidateValue} error={profile.lastname.error} required></DltTextField>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <DltTextField name='tel' type='number' label='เบอร์โทรติดต่อ' value={profile.tel.value} onChange={handleValueChange} onKeyUp={handleValidateValue} error={profile.tel.error} required></DltTextField>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <DltTextField name='email' type='email' label='Email Address' value={profile.email.value} onChange={handleValueChange} onKeyUp={handleValidateValue} error={profile.email.error} required></DltTextField>
                      </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={12}>
                    <DltTextField name='username' label='User Name' value={profile.username.value} onChange={handleValueChange} onKeyUp={handleValidateValue} error={profile.username.error} required></DltTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider></Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="initial">เปลี่ยนรหัสผ่าน</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <DltPasswordTextField name='newPassword' label='Password ใหม่' value={profile.newPassword.value} onChange={handleValueChange} onKeyUp={handleValidatePassword} error={profile.newPassword.error} required></DltPasswordTextField>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <DltPasswordTextField name='confirmPassword' label='ยืนยัน Password ใหม่' value={profile.confirmPassword.value} onChange={handleValueChange} onKeyUp={handleValidatePassword} error={profile.confirmPassword.error} required></DltPasswordTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                      <Typography variant="caption" color="initial">* Password ต้องมีความยาวอย่างน้อย 8 ตัวอักษร โดยเป็นตัวอักษร ผสมกับตัวเลข</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardActions>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                  <BtnSave loading={loading}></BtnSave>
                </Box>
              </CardActions>
            </Card>
          </Stack>
        </Container>
    </Slide>
  )
}

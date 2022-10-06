import { CardHeader, Container, Slide, Grid, Card, Typography, Box, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, CardActions, Stack, Divider, Button } from '@mui/material'
import React, { useState } from 'react'
import DltTextField from '../components/DltTextField'
import SelectTitle from '../components/SelectTitle'
import formValidator, {validator} from '../services/validator'
import {passwordValidator, emailValidator, hashMD5} from '../services/utils'
import DltPasswordTextField from '../components/DltPasswordTextField'
import BtnSave from '../components/BtnSave'
import { useEffect } from 'react'
import { getUserProfile, updateUserProfile } from '../services/profiles'
import SelectUserRole from '../components/SelectUserRole'
import SaveIcon from '@mui/icons-material/Save'

export default function Profile() {
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(false)
  const [open, setOpen] = useState(false)

    const [profile, setProfile] = useState({
        userRole: {
          value: ''
        },
        title: {
          value: ''
        },
        firstname: {
          value: '',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น'],
          error: false
        },
        lastname: {
          value: '',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น'],
          error: false
        },
        username: {
          value: ''
        },
        newPassword: {
          value: '',
          rules: [(v) => (!!v) ? passwordValidator(v) : true || '*รปแบบ Password ไม่เป็นไปตามรูปแบบที่กำหนด'],
          error: false
        },
        confirmPassword: {
          value: '',
          rules: [(v) => (!!v) ? passwordValidator(v) : true || '*รปแบบ Password ไม่เป็นไปตามรูปแบบที่กำหนด'],
          error: false
        },
        email: {
          value: '',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น',  (v) => emailValidator(v) || '*รูปแบบ email ไม่ถูกต้อง'],
          error: false
        },
        tel: {
          value: '',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น'],
          error: false
        }
    })

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

    const save = async (e) => {
      try {
        setLoading(true)
        const userForm = {
          TitleID: profile.title.value,
          FirstName: profile.firstname.value,
          LastName: profile.lastname.value,
          PhoneNo: profile.tel.value,
          EmailAddress: profile.email.value
        }
        if (profile.newPassword.value !== '') {
          userForm.LoginPassword = hashMD5(profile.newPassword.value)
        }
        await updateUserProfile(userForm)
        setOpen(true)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    const handleClose = () => {
      setOpen(false)
    }

    const init = async () => {
      const { UserID, RoleID, TitleID, LoginName, FirstName, LastName, PhoneNo, EmailAddress } = (await getUserProfile()).data
      profile.userRole.value = RoleID
      profile.title.value = TitleID
      profile.firstname.value = FirstName
      profile.lastname.value = LastName
      profile.tel.value = PhoneNo
      profile.email.value = EmailAddress
      profile.username.value = LoginName
      setProfile({...profile})
      setValid(formValidator(profile, setProfile))
    }

    useEffect(() => {
      init()
    }, [])
    
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
          <Stack spacing={2}>
            <div className='dlt-page-title'>
              <div className='dlt-page-title-text'>ข้อมูลผู้ใช้งาน</div>
              <div className='dlt-page-title-line'></div>
            </div>
            <Card>
                <CardContent>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      wrap="wrap"

                    >
                      <Grid item xs={12}>
                        <SelectUserRole  value={profile.userRole.value} name='userRole' disabled label='กลุ่มผู้ใช้งาน'></SelectUserRole>
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
                    <DltTextField name='username' label='User Name' value={profile.username.value} onChange={handleValueChange} readOnly required></DltTextField>
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
                  <BtnSave loading={loading} disabled={!valid} onClick={save}></BtnSave>
                </Box>
              </CardActions>
            </Card>
          </Stack>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <DialogContentText sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <SaveIcon color='success' sx={{ fontSize: 72 }}></SaveIcon>
                    <Typography variant='h6' gutterBottom component="div">บันทึกข้อมูลเสร็จสิ้น</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
              <Button variant="contained" color="secondary" onClick={handleClose}>ยกเลิก</Button>
              <Button variant="contained" color="success" onClick={handleClose}>ยืนยัน</Button>
            </DialogActions>
          </Dialog>
        </Container>
    </Slide>
  )
}

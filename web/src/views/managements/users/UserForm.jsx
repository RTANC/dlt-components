import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, CardActions, Stack, Divider, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import SelectUserRole from '../../../components/SelectUserRole'
import SelectStation from '../../../components/SelectStation'
import SelectTitle from '../../../components/SelectTitle'
import DltTextField from '../../../components/DltTextField'
import BtnBack from '../../../components/BtnBack'
import BtnSave from '../../../components/BtnSave'
import { LoadingButton } from '@mui/lab'
import SelectAgency from '../../../components/SelectAgency'
import { getUser } from '../../../services/managements'
import { useParams, useNavigate } from 'react-router-dom'
import { passwordValidator, emailValidator } from '../../../services/utils'
import formValidator, { validator } from '../../../services/validator'
import RadioBoxIsActiveUser from '../../../components/RadioBoxIsActiveUser'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ContactsIcon from '@mui/icons-material/Contacts'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import KeyIcon from '@mui/icons-material/Key'
import CallIcon from '@mui/icons-material/Call'
import DltPasswordTextField from '../../../components/DltPasswordTextField'

export default function UserForm() {
    const [loading, setLoading] = useState(false)
    const [valid, setValid] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const { uid } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        useRole: {
          value: 3
        },
        station: {
          value: 1
        },
        agency: {
          value: 189
        },
        title: {
          value: 1
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
          value: '',
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
          value: '',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น',  (v) => emailValidator(v) || '*รูปแบบ email ไม่ถูกต้อง'],
          error: false
        },
        tel: {
          value: '',
          rules: [(v) => !!v || '*ข้อมูลจำเป็น'],
          error: false
        },
        isActive: {
          value: true
        }
    })

    const handleValueChange = (e) => {
        user[e.target.name].value = e.target.value
        if(e.target.name === 'station') {
          switch (user['station']) {
            case 1: user['agency'].value = 189
              break;
            case 2: user['agency'].value = 191
              break;
            case 3: user['agency'].value = 194
              break;
          }
        }
        setUser({...user})
    }

    const handleValidateValue = (e) => {
      user[e.target.name].error = validator(e.target.value, user[e.target.name].rules)
      formValidator
      setUser({...user})
    }

    const init = async () => {
      try {
        const userData = (await getUser(uid)).data
        console.log(userData)
        user.title.value = userData.title
        user.useRole.value = userData.useRole
        user.station.value = userData.station
        user.agency.value = userData.agency
        user.firstname.value = userData.firstname
        user.lastname.value = userData.lastname
        user.username.value = userData.username
        user.email.value = userData.email
        user.tel.value = userData.tel
        user.isActive.value = userData.isActive
        setUser({...user})
      } catch (error) {
        console.log(error)
      }
    }

    const save  = async () => {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      if (uid !== '0') {
        setEditMode(true)
        init()
      } else {
        setEditMode(false)
      }
    }, [])


  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Container>
          <Stack spacing={2}>
          <Card>
              <CardHeader title={editMode ? 'แก้ไขข้อมูลผู้ใช้งาน' : 'เพิ่มข้อมูลผู้ใช้งาน'} titleTypographyProps={{variant: 'h5', display: 'flex', justifyContent: 'center'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap="wrap">
                  <Grid item xs={12}>
                    <SelectUserRole name='useRole' value={user.useRole.value} onChange={handleValueChange} required disabled={editMode}></SelectUserRole>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SelectStation name='station' value={user.station.value} onChange={handleValueChange} required disabled={editMode}></SelectStation>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SelectAgency name='agency' value={user.agency.value} onChange={handleValueChange} stationId={user.station.value} required disabled={editMode} error={user.agency.error}></SelectAgency>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider></Divider>
                  </Grid>
                  <Grid item xs={4} sm={4} md={2} lg={2}>
                      <SelectTitle value={user.title.value} onChange={handleValueChange}></SelectTitle>
                  </Grid>
                  <Grid item xs={4} sm={4} md={5} lg={5}>
                    <DltTextField label='ชื่อ' name='firstname' value={user.firstname.value} onChange={handleValueChange} onKeyUp={e => {setValid(formValidator(user, setUser))}} required error={user.firstname.error}></DltTextField>
                  </Grid>
                  <Grid item xs={4} sm={4} md={5} lg={5}>
                    <DltTextField label='นามสกุล' name='lastname' value={user.lastname.value} onChange={handleValueChange} onKeyUp={e => {setValid(formValidator(user, setUser))}} required error={user.lastname.error}></DltTextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <DltTextField label='เบอร์โทรติดต่อ' name='tel' value={user.tel.value} onChange={handleValueChange} onKeyUp={e => {setValid(formValidator(user, setUser))}} required error={user.tel.error}></DltTextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <DltTextField label='Email Address' name='email' value={user.email.value} onChange={handleValueChange} onKeyUp={e => {setValid(formValidator(user, setUser))}} required error={user.email.error}></DltTextField>
                  </Grid>
                </Grid>
              </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Grid container spacing={2} direction='row' wrap="wrap">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltTextField label='ชื่อผู้ใช้งาน' name='username' value={user.username.value} onChange={handleValueChange} onKeyUp={e => {setValid(formValidator(user, setUser))}} required disabled={editMode} error={user.username.error}></DltTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <RadioBoxIsActiveUser name='isActive' value={user.isActive.value} onChange={handleValueChange}></RadioBoxIsActiveUser>
                </Grid>
                <Grid item xs={12}>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" color="initial">{editMode ? 'เปลี่ยนรหัสผ่าน' : 'ตั้งรหัสผ่าน'}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltPasswordTextField label='รหัสผ่าน' name='newPassword' value={user.newPassword.value} onChange={handleValueChange} onKeyUp={e => {setValid(formValidator(user, setUser))}} required error={user.newPassword.error}></DltPasswordTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltPasswordTextField label='ยืนยันรหัสผ่าน' name='confirmPassword' value={user.confirmPassword.value} onChange={handleValueChange} onKeyUp={e => {setValid(formValidator(user, setUser))}} required error={user.confirmPassword.error}></DltPasswordTextField>
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
              <Box sx={{width: '100%', display:'flex', justifyContent:'center', alignContent: 'center'}}>
                <BtnBack loading={loading}></BtnBack>
                <BtnSave loading={loading} disabled={!valid} onClick={save}></BtnSave>
              </Box>
            </CardActions>
          </Card>
        </Stack>
        </Container>
    </Slide>
  )
}

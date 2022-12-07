import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, CardActions, Stack, Divider, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import SelectUserRole from '../../../components/SelectUserRole'
import SelectStation from '../../../components/SelectStation'
import SelectTitle from '../../../components/SelectTitle'
import DltTextField from '../../../components/DltTextField'
import BtnBack from '../../../components/BtnBack'
import BtnSave from '../../../components/BtnSave'
import SelectAgency from '../../../components/SelectAgency'
import { createUser, getUser, updateUser } from '../../../services/managements'
import { useParams, useNavigate } from 'react-router-dom'
import { passwordValidator, emailValidator, getKeyValue, hashMD5 } from '../../../services/utils'
import formValidator, { validator } from '../../../services/validator'
import RadioBoxIsActiveUser from '../../../components/RadioBoxIsActiveUser'
import DltPasswordTextField from '../../../components/DltPasswordTextField'

export default function UserForm() {
    const [loading, setLoading] = useState(false)
    const [valid, setValid] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const { uid } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        userRole: {
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
        if (e.target.name === 'isActive') {
          if (e.target.value === 'true') {
            user[e.target.name].value = true
          } else {
            user[e.target.name].value = false
          }
        }
        setUser({...user})
    }

    const handleValidateValue = (e) => {
      // user[e.target.name].error = validator(e.target.value, user[e.target.name].rules)
      setValid(formValidator(user, setUser))
    }

    const handleValidatePassword = (e) => {
      setValid(formValidator(user, setUser))
      if (user.newPassword.value === user.confirmPassword.value) {
        user.newPassword.error = false
        user.confirmPassword.error = false
      } else if (user.newPassword.value !== user.confirmPassword.value) {
        user.newPassword.error = 'Password ไม่ตรงกัน'
        user.confirmPassword.error = 'Password ไม่ตรงกัน'
        setValid(false)
        setUser({...user})
      }
    }

    const init = async () => {
      try {
        const userData = (await getUser(uid)).data
        user.title.value = userData.title
        user.userRole.value = userData.userRole
        user.station.value = userData.station
        user.agency.value = userData.agency
        user.firstname.value = userData.firstname
        user.lastname.value = userData.lastname
        user.username.value = userData.username
        user.email.value = userData.email
        user.tel.value = userData.tel
        user.isActive.value = userData.isActive
        setUser({...user})
        setValid(formValidator(user, setUser))
      } catch (error) {
        console.log(error)
      }
    }

    const save  = async () => {
        try {
          setLoading(true)
          const tmp = getKeyValue(user)
          if (tmp.newPassword !== '') {
            tmp.newPassword = hashMD5(tmp.newPassword)
          } else {
            delete tmp.newPassword
          }
          
          if (!editMode) {
            await createUser(tmp)
          } else {
            await updateUser(uid, tmp)
          }
          navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
          setLoading(false)
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
          <div className='dlt-page-title'>
            <div className='dlt-page-title-text'>{editMode ? 'แก้ไขข้อมูลผู้ใช้งาน' : 'เพิ่มข้อมูลผู้ใช้งาน'}</div>
            <div className='dlt-page-title-line'></div>
          </div>
          <Stack spacing={2}>
          <Card>
              <CardContent>
                <Grid container spacing={2} direction='row' wrap="wrap">
                  <Grid item xs={12}>
                    <SelectUserRole name='userRole' value={user.userRole.value} onChange={handleValueChange} required disabled={editMode}></SelectUserRole>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SelectStation name='station' value={user.station.value} onChange={handleValueChange} required disabled={editMode}></SelectStation>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SelectAgency name='agency' value={user.agency.value} onChange={handleValueChange} stationId={user.station.value} required disabled={editMode} error={user.agency.error}></SelectAgency>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider variant="middle"></Divider>
                  </Grid>
                  <Grid item xs={4} sm={4} md={2} lg={2}>
                    <SelectTitle value={user.title.value} onChange={handleValueChange}></SelectTitle>
                  </Grid>
                  <Grid item xs={4} sm={4} md={5} lg={5}>
                    <DltTextField label='ชื่อ' name='firstname' value={user.firstname.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required error={user.firstname.error}></DltTextField>
                  </Grid>
                  <Grid item xs={4} sm={4} md={5} lg={5}>
                    <DltTextField label='นามสกุล' name='lastname' value={user.lastname.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required error={user.lastname.error}></DltTextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <DltTextField label='เบอร์โทรติดต่อ' name='tel' value={user.tel.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required error={user.tel.error}></DltTextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <DltTextField label='Email Address' name='email' value={user.email.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required error={user.email.error}></DltTextField>
                  </Grid>
                </Grid>
              </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Grid container spacing={2} direction='row' wrap="wrap">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltTextField label='ชื่อผู้ใช้งาน' name='username' value={user.username.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required readOnly={editMode} error={user.username.error}></DltTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <RadioBoxIsActiveUser name='isActive' value={user.isActive.value} onChange={handleValueChange}></RadioBoxIsActiveUser>
                </Grid>
                <Grid item xs={12}>
                  <Divider variant="middle"></Divider>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 600, fontSize: 24, color: 'white'}}>{editMode ? 'เปลี่ยนรหัสผ่าน' : 'ตั้งรหัสผ่าน'}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltPasswordTextField label='รหัสผ่าน' name='newPassword' value={user.newPassword.value} onChange={handleValueChange} onKeyUp={handleValidatePassword} required error={user.newPassword.error}></DltPasswordTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltPasswordTextField label='ยืนยันรหัสผ่าน' name='confirmPassword' value={user.confirmPassword.value} onChange={handleValueChange} onKeyUp={handleValidatePassword} required error={user.confirmPassword.error}></DltPasswordTextField>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="caption" sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 14, color: '#F15353'}}>*</Typography>
                    <Typography variant="caption" sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 300, fontSize: 16, color: '#D4D4D4'}}>&nbsp; Password ต้องมีความยาวอย่างน้อย 8 ตัวอักษร โดยเป็นตัวอักษร ผสมกับตัวเลข</Typography>
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

import { Card, CardHeader, Container, Slide, Box, CardContent, Grid, CardActions} from '@mui/material'
import React, { useEffect, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import SelectUserRole from '../../../components/SelectUserRole'
import SelectStation from '../../../components/SelectStation'
import SelectTitle from '../../../components/SelectTitle'
import DltTextField from '../../../components/DltTextField'
import { LoadingButton } from '@mui/lab'
import SelectAgency from '../../../components/SelectAgency'
import EditIcon from '@mui/icons-material/Edit'
import { getUser } from '../../../services/managements'
import { useParams, useNavigate } from 'react-router-dom'
import { passwordValidator, emailValidator } from '../../../services/utils'
import { validator } from '../../../services/validator'
import CheckBoxChPasswd from '../../../components/CheckBoxChPasswd'
import RadioBoxIsActiveUser from '../../../components/RadioBoxIsActiveUser'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ContactsIcon from '@mui/icons-material/Contacts'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import KeyIcon from '@mui/icons-material/Key'
import CallIcon from '@mui/icons-material/Call'

export default function UserForm() {
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const { uid } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        id: null,
        useRole: 3,
        station: 1,
        agency: 189,
        title: 1,
        firstname: {
          value: '',
          rules: [],
          error: false
        },
        lastname: {
          value: '',
          rules: [],
          error: false
        },
        username: {
          value: '',
          rules: [],
          error: false
        },
        chPasswd: false,
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
          value: '',
          rules: [],
          error: false
        },
        tel: {
          value: '',
          rules: [],
          error: false
        },
        isActive: true
    })

    user.firstname.rules = [!!user.firstname.value || '*ข้อมูลจำเป็น']
    user.lastname.rules = [!!user.lastname.value || '*ข้อมูลจำเป็น']
    user.username.rules = [!!user.username.value || '*ข้อมูลจำเป็น']
    user.newPassword.rules = [!!user.newPassword.value || '*ข้อมูลจำเป็น', passwordValidator(user.newPassword.value) || '*รปแบบ Password ไม่เป็นไปตามรูปแบบที่กำหนด', (user.newPassword.value === user.confirmPassword.value) || 'Password ไม่ตรงกัน' ]
    user.confirmPassword.rules = [!!user.confirmPassword.value || '*ข้อมูลจำเป็น', passwordValidator(user.newPassword.value) || '*รปแบบ Password ไม่เป็นไปตามรูปแบบที่กำหนด', (user.newPassword.value === user.confirmPassword.value) || 'Password ไม่ตรงกัน']
    user.email.rules = [!!user.email.value || '*ข้อมูลจำเป็น', emailValidator(user.email.value) || '*รูปแบบ email ไม่ถูกต้อง']
    user.tel.rules = [!!user.tel.value || '*ข้อมูลจำเป็น']

    const handleChange = (e) => {
      user[e.target.name] = e.target.value
        if(e.target.name === 'station') {
          switch (user['station']) {
            case 1: user['agency'] = 189
              break;
            case 2: user['agency'] = 191
              break;
            case 3: user['agency'] = 194
              break;
          }
        }
        setUser({...user})
    }

    const handleValueChange = (e) => {
        user[e.target.name].value = e.target.value
        setUser({...user})
    }

    const handleValidateValue = (e) => {
      if (e.target.name === 'confirmPassword') {
        user['newPassword'].error = validator(user[e.target.name].rules)
      } else {
        user[e.target.name].error = validator(user[e.target.name].rules)
      }
      setUser({...user})
    }

    const handleChpasswd = (e) => {
      if (e.target.checked) {
        user.newPassword.rules = [!!user.newPassword.value || '*ข้อมูลจำเป็น', passwordValidator(user.newPassword.value) || '*รปแบบ Password ไม่เป็นไปตามรูปแบบที่กำหนด', (user.newPassword.value === user.confirmPassword.value) || 'Password ไม่ตรงกัน' ]
        user.confirmPassword.rules = [!!user.confirmPassword.value || '*ข้อมูลจำเป็น', passwordValidator(user.newPassword.value) || '*รปแบบ Password ไม่เป็นไปตามรูปแบบที่กำหนด', (user.newPassword.value === user.confirmPassword.value) || 'Password ไม่ตรงกัน']
      } else {
        user.newPassword.value = ''
        user.newPassword.rules = []
        user.newPassword.error = false
        user.confirmPassword.value = ''
        user.confirmPassword.rules = []
        user.confirmPassword.error = false
      }
      setUser({...user, chPasswd: e.target.checked})
    }

    const init = async () => {
      try {
        const userData = (await getUser(uid)).data
        console.log(userData)
        user.id = userData.id
        user.title = userData.title
        user.useRole = userData.useRole
        user.station = userData.station
        user.agency = userData.agency
        user.firstname.value = userData.firstname
        user.lastname.value = userData.lastname
        user.username.value = userData.username
        user.email.value = userData.email
        user.tel.value = userData.tel
        user.isActive = userData.isActive
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

    const cancel = () => {
      navigate(-1)
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
        <Container maxWidth="false">
        <Card>
            <CardHeader title={<Box sx={{display: 'flex',alignItems: 'center' }}><EditIcon/> { editMode ? 'แก้ไขข้อมูลผู้ใช้งาน' : 'เพิ่มข้อมูลผู้ใช้งาน'}</Box>} titleTypographyProps={{variant: 'h6', align: 'left'}} sx={{backgroundColor: '#eeeeee'}}></CardHeader>
            <CardContent>
              <Grid container spacing={2} direction='row' wrap="wrap">
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <SelectUserRole name='useRole' value={user.useRole} onChange={handleChange} required disabled={editMode}></SelectUserRole>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <SelectStation name='station' value={user.station} onChange={handleChange} required disabled={editMode}></SelectStation>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <SelectAgency name='agency' value={user.agency} onChange={handleChange} stationId={user.station} required disabled={editMode}></SelectAgency>
                </Grid>
                <Grid item xs={4} sm={4} md={2} lg={2}>
                    <SelectTitle value={user.title} onChange={(e) => {setUser({...user, title: e.target.value})}}></SelectTitle>
                </Grid>
                <Grid item xs={4} sm={4} md={5} lg={5}>
                  <DltTextField label='ชื่อ' name='firstname' value={user.firstname.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required error={user.firstname.error} startIcon={<ContactsIcon/>}></DltTextField>
                </Grid>
                <Grid item xs={4} sm={4} md={5} lg={5}>
                  <DltTextField label='นามสกุล' name='lastname' value={user.lastname.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required error={user.lastname.error}></DltTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={7}>
                  <DltTextField label='User Name' name='username' value={user.username.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required disabled={editMode} error={user.username.error} startIcon={<AccountCircle/>}></DltTextField>
                </Grid>
                {editMode && <Grid item xs={12} sm={12} md={5} lg={5}>
                  <CheckBoxChPasswd value={user.chPasswd} onChange={handleChpasswd}></CheckBoxChPasswd>
                </Grid>}
                {(!editMode || user.chPasswd) && <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltTextField type='password' label='New Password' name='newPassword' value={user.newPassword.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required error={user.newPassword.error} startIcon={<KeyIcon/>}></DltTextField>
                </Grid>}
                {(!editMode || user.chPasswd) && <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltTextField type='password' label='Confirm New Password' name='confirmPassword' value={user.confirmPassword.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required  error={user.newPassword.error} startIcon={<KeyIcon/>}></DltTextField>
                </Grid>}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltTextField label='Email Address' name='email' value={user.email.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required error={user.email.error}  startIcon={<AlternateEmailIcon/>}></DltTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <DltTextField label='เบอร์โทรติดต่อ' name='tel' value={user.tel.value} onChange={handleValueChange} onKeyUp={handleValidateValue} required error={user.tel.error} startIcon={<CallIcon/>}></DltTextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <RadioBoxIsActiveUser name='isActive' value={user.isActive} onChange={handleChange}></RadioBoxIsActiveUser>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
                <Box sx={{width: '100%', alignContent: 'center'}}>
                    <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='primary' variant='contained' onClick={save} startIcon={<SaveIcon/>}>บันทึก</LoadingButton>
                    <LoadingButton loading={loading} disabled={loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={cancel} startIcon={<CancelIcon/>}>ยกเลิก</LoadingButton>
                </Box>
            </CardActions>
        </Card>
        </Container>
    </Slide>
  )
}

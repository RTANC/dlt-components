import React from 'react'
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Box, Typography, Container, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/loginSlice'
import DltPasswordTextField from '../components/DltPasswordTextField'
import DltTextField from '../components/DltTextField'
import { useState } from 'react'
import { logins } from '../services/logins'
import Swal from 'sweetalert2'
import { hashMD5, passwordValidator } from '../services/utils'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import formValidator from '../services/validator'
import { api } from '../services/api'

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({
      username: {
        value: ''
      },
      password: {
        value: '',
        rules: [(v) => passwordValidator(v) || '*รปแบบ Password ไม่เป็นไปตามรูปแบบที่กำหนด'],
        error: false
      }
    })
    const [stay, setStay] = useState(false)

    const handleChange = (e) => {
      data[e.target.name].value = e.target.value
      setData({...data})
    }

    const handleCheck = (e) => {
      setStay(e.target.checked)
    }

    const handleEnterKey = (e) => {
      if (e.key === 'Enter') {
        handleSubmit()
      }
    }

    const handleSubmit = async () => {   
      try {
        if (formValidator(data, setData)) {
          const { UserID, RoleID, LoginName, token } = (await logins({
            username: data.username.value,
            password: hashMD5(data.password.value)
          })).data
          if (stay) {
            Cookies.set('UserID', UserID, { expires: 7 })
            Cookies.set('RoleID', RoleID, { expires: 7 })
            Cookies.set('LoginName', LoginName, { expires: 7 })
            Cookies.set('token', token, { expires: 7 })
          }
          api.defaults.headers.common['Authorization'] = "Bearer " + token
          navigate('/home')
          dispatch(login({
            UserID: UserID,
            RoleID: RoleID,
            LoginName: LoginName,
            token: token
          }))
        } else {
          throw new Error('บัญชีผู้ใช้ หรือ รหัสผ่าน ไม่เป็นไปตามรูปแบบที่กำหนด')
        }
      } catch (error) {
        // console.log(error.response.data.message)
        if (typeof error.response !== 'undefined') {
          Swal.fire({
            icon: 'error',
            title: 'ผิดพลาด',
            text: error.response.data.message
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ผิดพลาด',
            text: error.message
          })
        }        
      }
    }

    useEffect(() => {
      if (Cookies.get('token')) {
        const { UserID, RoleID, LoginName, token } = Cookies.get()
        api.defaults.headers.common['Authorization'] = "Bearer " + token
        navigate('/home')
        dispatch(login({
          UserID: UserID,
          RoleID: RoleID,
          LoginName: LoginName,
          token: token
        }))
      }
    }, [])
    
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Stack spacing={2}>
          <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Avatar src='/static/logo_dlt.png' sx={{ m: 1, bgcolor: 'secondary.main', width: 150, height: 150 }}></Avatar>
            <Typography component="h1" variant="h5">
                ระบบควบคุมประตูอัตโนมัติ
            </Typography>
            <Typography component="h1" variant="h5">
                Gate Control System
            </Typography>
          </Box>
          <DltTextField value={data.username.value} label="ชื่อผู้ใช้งาน" name="username" autoFocus focused={false} onChange={handleChange}></DltTextField>
          <DltPasswordTextField value={data.password.value} label="รหัสผ่าน" name="password" onChange={handleChange} onKeyUp={handleEnterKey}></DltPasswordTextField>
          <FormControlLabel
            control={<Checkbox value={stay} color="primary" onChange={handleCheck}/>}
            label="คงสถานะการเข้าสู่ระบบ"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            เข้าสู่ระบบ
          </Button>
        </Stack>
      </Container>
  )
}

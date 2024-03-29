import React from 'react'
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Box, Typography, Container, Stack, Grid } from '@mui/material'
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
import '../styles/Login.css'
import { styled } from "@mui/material/styles"
import { getUserProfile } from '../services/profiles'

const LoginButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Kanit',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 24,
  background: 'linear-gradient(105.67deg, #9D29F8 0%, #2283F3 78.09%)',
  borderRadius: 12,
  height: 48
}))

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
            Cookies.set('stay', token, { expires: 7 })
          }
          Cookies.set('UserID', UserID, { expires: 7 })
          Cookies.set('RoleID', RoleID, { expires: 7 })
          Cookies.set('LoginName', LoginName, { expires: 7 })
          Cookies.set('token', token, { expires: 7 })

          api.defaults.headers.common['Authorization'] = "Bearer " + Cookies.get('token')
          const { CompanyID, StationID } = (await getUserProfile()).data
          Cookies.set('CompanyID', CompanyID, { expires: 7 })
          Cookies.set('StationID', StationID, { expires: 7 })
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
      console.log(__APP_VERSION__)
      if (Cookies.get('token') && Cookies.get('stay')) {
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
    <div className='bg-img'>
      <Container>
        {/* <CssBaseline /> */}
        <Grid container direction='row' wrap='wrap' sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ marginTop: '15vh' }} className='login-panel'>
            <Stack spacing={3}>
              <img src="gcs-login-title.png"/>
              <DltTextField value={data.username.value} label="ชื่อผู้ใช้งาน" placeholder="ชื่อผู้ใช้งาน" name="username" autoFocus focused={false} onChange={handleChange}></DltTextField>
              <DltPasswordTextField value={data.password.value} label="รหัสผ่าน" name="password" onChange={handleChange} onKeyUp={handleEnterKey}></DltPasswordTextField>
              <FormControlLabel
                control={<Checkbox value={stay} onChange={handleCheck}/>}
                label="คงสถานะการเข้าสู่ระบบ"
              />
              <LoginButton fullWidth variant="contained" onClick={handleSubmit}>เข้าสู่ระบบ</LoginButton>
            </Stack>
          </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

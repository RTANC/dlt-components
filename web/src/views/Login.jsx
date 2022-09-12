import React from 'react'
import { Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Box, Typography, Container, Stack, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/loginSlice'
import DltPasswordTextField from '../components/DltPasswordTextField'
import DltTextField from '../components/DltTextField'
import { useState } from 'react'
import { logins } from '../services/logins'
import CancelIcon from '@mui/icons-material/Cancel'

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const [data, setData] = useState({
      username: '',
      password: ''
    })
    const handleChange = (e) => {
      data[e.target.name] = e.target.value
      setData({...data})
    }
    const handleSubmit = async () => {   
      try {
        console.log(data)
        const resp = (await logins(data)).data
        console.log(resp)
        dispatch(login())
        navigate('/home')
      } catch (error) {
        console.log(error.response.data.message)
        if (typeof error.response.data.message!== 'undefined') {
          setErrorMsg(error.response.data.message)
          setOpen(true)
        } else {
          console.log(error)
        }
      }
    }
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
          <DltTextField value={data.username} label="ชื่อผู้ใช้งาน" name="username" autoFocus focused={false} onChange={handleChange}></DltTextField>
          <DltPasswordTextField value={data.password} label="รหัสผ่าน" name="password" autoComplete="current-password" onChange={handleChange}></DltPasswordTextField>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
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
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
              <DialogContentText sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CancelIcon color='error' sx={{ fontSize: 72, my: 1 }}></CancelIcon>
                <Typography variant='h6' gutterBottom component="div" sx={{my: 2}}>{errorMsg}</Typography>
              </DialogContentText>
          </DialogContent>
          <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" color="error" onClick={handleClose}>
              ทราบ
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
  )
}

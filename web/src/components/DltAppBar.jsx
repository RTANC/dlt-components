import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Button } from '@mui/material'
import DltReportMenu from './DltReportMenu'
import DltDataManageMenu from './DltDataManageMenu'
import DltManualMenu from './DltManualMenu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded'
import {useSelector, useDispatch} from 'react-redux'
import {logout} from '../redux/loginSlice'
import { useNavigate } from 'react-router-dom'

export default function DltAppBar() {
    const auth = useSelector((state) => state.login.isLogin)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()


    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
      setAnchorEl(null);
    }

    const handleLogout = () => {
      dispatch(logout())
      handleClose()
      navigate('/')
    }

  return (
    <AppBar position="static" sx={{mb: 2}}>
        <Toolbar>
          <Typography variant="h6" component="div" to="/home" sx={{ display: 'flex', mr: 2 }}>
            GCS
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Button color="primary" sx={{ color: 'white' }} startIcon={<LocalShippingIcon></LocalShippingIcon>} onClick={() => navigate('/home')}>
                บันทึกข้อมูลรับส่งสินค้า
              </Button>
              <Button color="primary" sx={{ color: 'white' }} startIcon={<FindInPageRoundedIcon></FindInPageRoundedIcon>} onClick={() => navigate('/query')}>
                สืบค้นข้อมูล
              </Button>
              <DltReportMenu></DltReportMenu>
              <DltDataManageMenu></DltDataManageMenu>
              <DltManualMenu></DltManualMenu>
          </Box>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>ข้อมูลผู้ใช้งาน</MenuItem>
                <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
    </AppBar>
  )
}

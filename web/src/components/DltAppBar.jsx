import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Button } from '@mui/material'
import DltReportMenu from './DltReportMenu'
import DltDataManageMenu from './DltDataManageMenu'
import DltManualMenu from './DltManualMenu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded'

export default function DltAppBar() {
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);


    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
      setAnchorEl(null);
    }

  return (
    <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" to="/home" sx={{ display: 'flex', mr: 2 }}>
            GCS
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Button color="primary" sx={{ color: 'white' }} startIcon={<LocalShippingIcon></LocalShippingIcon>}>
                บันทึกข้อมูลรับส่งสินค้า
              </Button>
              <Button color="primary" sx={{ color: 'white' }} startIcon={<FindInPageRoundedIcon></FindInPageRoundedIcon>}>
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
    </AppBar>
  )
}

import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { DatabaseCog } from 'mdi-material-ui'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useNavigate } from 'react-router-dom'

export default function DltDataManageMenu() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()

    const handleClick = (e) => {
      setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null)
    }
  return (
    <React.Fragment>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: 'white' }}
        color="primary"
        startIcon={<DatabaseCog></DatabaseCog>}
        endIcon={<ArrowDropDownIcon></ArrowDropDownIcon>}
      >
        จัดการข้อมูล
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {handleClose(); navigate('/management/user')}}>ข้อมูลผู้ใช้งาน</MenuItem>
        <MenuItem onClick={() => {handleClose(); navigate('/management/company')}}>รายชื่อผู้ประกอบการ</MenuItem>
        <MenuItem onClick={() => {handleClose(); navigate('/management/user')}}>รายการรถของผู้ประกอบการ</MenuItem>
        <MenuItem onClick={() => {handleClose(); navigate('/management/user')}}>รายการรถลูกค้าของผู้ประกอบการ</MenuItem>
        <MenuItem onClick={() => {handleClose(); navigate('/management/user')}}>เกณฑ์การเปิดไม้กั้นโดยอัตโนมัติ ของรถลูกค้าของผู้ประกอบการ</MenuItem>
        <MenuItem onClick={() => {handleClose(); navigate('/management/user')}}>ข้อมูลเหตุการณ์ภายในระบบ</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { InformationOutline } from 'mdi-material-ui'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

export default function DltManualMenu() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
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
        startIcon={<InformationOutline></InformationOutline>}
        endIcon={<ArrowDropDownIcon></ArrowDropDownIcon>}
      >
        คู่มือ
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
        <MenuItem onClick={handleClose}>คู่มือสำหรับผู้ประกอบการ</MenuItem>
        <MenuItem onClick={handleClose}>คู่มือสำหรับเจ้าหน้าที่</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

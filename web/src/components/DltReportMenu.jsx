import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

export default function DltReportMenu() {
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
        startIcon={<BarChartIcon></BarChartIcon>}
        endIcon={<ArrowDropDownIcon></ArrowDropDownIcon>}
      >
        รายงาน
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
        <MenuItem onClick={handleClose}>GCS01 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายสถานี</MenuItem>
        <MenuItem onClick={handleClose}>GCS02 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามประเภทรถ</MenuItem>
        <MenuItem onClick={handleClose}>GCS03 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามชื่อผู้ประกอบการ</MenuItem>
        <MenuItem onClick={handleClose}>GCS04 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามภูมิภาค ต้นทาง-ปลายทาง</MenuItem>
        <MenuItem onClick={handleClose}>GCS05 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายชั่วโมง</MenuItem>
        <MenuItem onClick={handleClose}>GCS06 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายวัน</MenuItem>
        <MenuItem onClick={handleClose}>GCS07 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายเดือน</MenuItem>
        <MenuItem onClick={handleClose}>GCS08 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายปี</MenuItem>
        <MenuItem onClick={handleClose}>GCS09 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ช่วงกลางวัน-กลางคืน</MenuItem>
        <MenuItem onClick={handleClose}>GCS10 ระยะเวลาเฉลี่ยที่รถแต่ละคันใช้เวลาอยู่ในสถานี แยกตามประเภทรถ</MenuItem>
        <MenuItem onClick={handleClose}>GCS11 ระยะเวลาเฉลี่ยที่รถแต่ละคันใช้เวลาอยู่ในสถานี แยกตามผู้ประกอบการ</MenuItem>
        <MenuItem onClick={handleClose}>GCS12 รายการแก้ไขป้ายทะเบียนโดยผู้บันทึกข้อมูล</MenuItem>
        <MenuItem onClick={handleClose}>GCS13 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามประเภทรถ (ข้อมูลบันทึกโดยอัตโนมัติ)</MenuItem>
        <MenuItem onClick={handleClose}>GCS14 ปริมาณข้อมูลที่ถูกบันทึกโดยผู้ประกอบการ</MenuItem>
        <MenuItem onClick={handleClose}>GCS15 จำนวนรถรับส่งสินค้า แยกตามประเภทสินค้า</MenuItem>
        <MenuItem onClick={handleClose}>GCS16 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามรายจังหวัด ต้นทาง-ปลายทาง</MenuItem>
        <MenuItem onClick={handleClose}>GCS17 รายงานการคำนวณต้นทุนการขนส่งที่ลดลงได้จากการใช้งานสถานีขนส่งสินค้า</MenuItem>
        <MenuItem onClick={handleClose}>GCS18 รายงานการขนส่งสัตว์หรือสิ่งของประเภทการขนส่งไม่ประจำทางและส่วนบุคคล</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

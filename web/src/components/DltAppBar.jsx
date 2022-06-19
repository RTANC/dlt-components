import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, ListItemButton, Box, Button, Drawer, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Divider, Stack, Collapse } from '@mui/material'
import DltReportMenu from './DltReportMenu'
import DltDataManageMenu from './DltDataManageMenu'
import DltManualMenu from './DltManualMenu'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded'
import BarChartIcon from '@mui/icons-material/BarChart'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { DatabaseCog, InformationOutline } from 'mdi-material-ui'

import {useSelector, useDispatch} from 'react-redux'
import {logout} from '../redux/loginSlice'
import { useNavigate } from 'react-router-dom'

const reportLinks = [{link: '/report/GCS01', text: 'GCS01 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายสถานี'},
{link: '/report/GCS02', text: 'GCS02 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามประเภทรถ'},
{link: '/report/GCS03', text: 'GCS03 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามชื่อผู้ประกอบการ'},
{link: '/report/GCS04', text: 'GCS04 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามภูมิภาค ต้นทาง-ปลายทาง'},
{link: '/report/GCS05', text: 'GCS05 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายชั่วโมง'},
{link: '/report/GCS06', text: 'GCS06 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายวัน'},
{link: '/report/GCS07', text: 'GCS07 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายเดือน'},
{link: '/report/GCS08', text: 'GCS08 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี รายปี'},
{link: '/report/GCS09', text: 'GCS09 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ช่วงกลางวัน-กลางคืน'},
{link: '/report/GCS10', text: 'GCS10 ระยะเวลาเฉลี่ยที่รถแต่ละคันใช้เวลาอยู่ในสถานี แยกตามประเภทรถ'},
{link: '/report/GCS11', text: 'GCS11 ระยะเวลาเฉลี่ยที่รถแต่ละคันใช้เวลาอยู่ในสถานี แยกตามผู้ประกอบการ'},
{link: '/report/GCS12', text: 'GCS12 รายการแก้ไขป้ายทะเบียนโดยผู้บันทึกข้อมูล'},
{link: '/report/GCS13', text: 'GCS13 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามประเภทรถ (ข้อมูลบันทึกโดยอัตโนมัติ)'},
{link: '/report/GCS14', text: 'GCS14 ปริมาณข้อมูลที่ถูกบันทึกโดยผู้ประกอบการ'},
{link: '/report/GCS15', text: 'GCS15 จำนวนรถรับส่งสินค้า แยกตามประเภทสินค้า'},
{link: '/report/GCS16', text: 'GCS16 จำนวนรถและปริมาณสินค้าที่เข้า-ออกสถานี ตามรายจังหวัด ต้นทาง-ปลายทาง'},
{link: '/report/GCS17', text: 'GCS17 รายงานการคำนวณต้นทุนการขนส่งที่ลดลงได้จากการใช้งานสถานีขนส่งสินค้า'},
{link: '/report/GCS18', text: 'GCS18 รายงานการขนส่งสัตว์หรือสิ่งของประเภทการขนส่งไม่ประจำทางและส่วนบุคคล'}] 

export default function DltAppBar() {
    const auth = useSelector((state) => state.login.isLogin)
    const dispatch = useDispatch()
    const [state, setState] = useState(false)
    const [reportMenu, setReportMenu] = useState(false)
    const [dataMenu, setDataMenu] = useState(false)
    const [manualMenu, setManualMenu] = useState(false)
    
    const navigate = useNavigate()


    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return
      }
  
      setState(open)
    }

    const toggleReportMenu = (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setReportMenu(!reportMenu)
      setDataMenu(false)
      setManualMenu(false)
    }

    const toggleDataMenu = (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setDataMenu(!dataMenu)
      setReportMenu(false)
      setManualMenu(false)
    }

    const toggleManualMenu = (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setManualMenu(!manualMenu)
      setDataMenu(false)
      setReportMenu(false)
    }

    const gotoProfile = () => {
      
    }

    const handleLogout = () => {
      dispatch(logout())
      toggleDrawer(false)
      navigate('/')
    }


  return (
    <React.Fragment>
    <AppBar position="static" sx={{mb: 2}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            GCS
          </Typography>
          {auth && (
            <IconButton
              size="large"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
    </AppBar>
    <Drawer anchor='right' open={state} variant='temporary' ModalProps={{keepMounted: true}} onClose={toggleDrawer(false)}>
    <Stack sx={{width: [240, 340, 440, 540, 540]}} role='presentation'>
        <Box component='div' sx={{display: 'flex', justifyContent: 'flex-end', py: 1, pr: 2}}>
          <IconButton onClick={toggleDrawer(false)} disableRipple size='large'>
            <CloseIcon/>  
          </IconButton>
        </Box>
        <List subheader={<ListSubheader>เมนูผู้ใช้งาน</ListSubheader>}>
          <Divider></Divider>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {setState(false); navigate('/profile')}}>
              <ListItemIcon><AccountCircleIcon/></ListItemIcon>
              <ListItemText primary='ข้อมูลผู้ใช้งาน'/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutIcon/></ListItemIcon>
              <ListItemText primary='ออกจากระบบ'/>
            </ListItemButton>
          </ListItem>
        </List>
        <List subheader={<ListSubheader>เมนูหลัก</ListSubheader>}>
          <Divider></Divider>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {setState(false); navigate('/home')}}>
              <ListItemIcon><LocalShippingIcon/></ListItemIcon>
              <ListItemText primary='บันทึกข้อมูลรับส่งสินค้า'/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {setState(false); navigate('/query')}}>
              <ListItemIcon><FindInPageRoundedIcon/></ListItemIcon>
              <ListItemText primary='สืบค้นข้อมูล'/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleReportMenu}>
              <ListItemIcon><BarChartIcon/></ListItemIcon>
              <ListItemText primary='รายงาน'/>
              <ListItemIcon>{reportMenu ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}</ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Collapse in={reportMenu} timeout="auto" unmountOnExit>
              <List>
                {reportLinks.map((v, i) => (
                  <ListItem disablePadding key={i}>
                    <ListItemButton  onClick={() => {setState(false); navigate(v.link)}}>
                      <ListItemText inset primary={v.text}/>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
          </Collapse>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleDataMenu}>
              <ListItemIcon><DatabaseCog/></ListItemIcon>
              <ListItemText primary='จัดการข้อมูล'/>
              <ListItemIcon>{dataMenu ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}</ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Collapse in={dataMenu} timeout="auto" unmountOnExit>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => {setState(false); navigate('/management/user')}}>
                    <ListItemText inset primary='ข้อมูลผู้ใช้งาน'/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => {setState(false); navigate('/management/company')}}>
                    <ListItemText inset primary='รายชื่อผู้ประกอบการ'/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText inset primary='รายการรถของผู้ประกอบการ'/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText inset primary='รายการรถลูกค้าของผู้ประกอบการ'/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText inset primary='เกณฑ์การเปิดไม้กั้นโดยอัตโนมัติ ของรถลูกค้าของผู้ประกอบการ'/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText inset primary='ข้อมูลเหตุการณ์ภายในระบบ'/>
                  </ListItemButton>
                </ListItem>
              </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton onClick={toggleManualMenu}>
              <ListItemIcon><InformationOutline/></ListItemIcon>
              <ListItemText primary='คู่มือการใช้งาน'/>
              <ListItemIcon>{manualMenu ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}</ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Collapse in={manualMenu} timeout="auto" unmountOnExit>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText inset primary='คู่มือสำหรับผู้ประกอบการ'/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText inset primary='คู่มือสำหรับเจ้าหน้าที่'/>
                  </ListItemButton>
                </ListItem>
              </List>
          </Collapse>
        </List>
      </Stack>
    </Drawer>
    </React.Fragment>
  )
}

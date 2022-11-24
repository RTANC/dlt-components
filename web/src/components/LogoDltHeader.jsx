import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import '../styles/LogoDltHeader.css'
export default function LogoDltHeader() {
  return (
    <Box component='div' sx={{display: 'flex', alignItems: 'center', height: 112}}>
        <Box component='div'>
            <img src="logo_dlt.png" width='74' height='74'/>
        </Box>
        <Box component='div' sx={{ml: 2}}>
            <Typography variant="caption" sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: '2vmax', color: 'white'}}>กรมการขนส่งทางบก</Typography>
            <div className='divider-line'></div>
            <Typography variant="subtitle1" sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 275, fontSize: '1.3vmax', color: 'white'}}>Department of Land Transport</Typography>
        </Box>
    </Box>
  )
}

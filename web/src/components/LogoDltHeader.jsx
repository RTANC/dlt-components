import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import '../styles/LogoDltHeader.css'
export default function LogoDltHeader() {
  return (
    <Box component='div' sx={{display: 'flex', alignItems: 'center', height: 112}}>
        <Box component='div'>
            {/* <img src={`/logo_dlt.png`} width='74' height='74'/> */}
            <img src={`./logo_dlt.png`} width='74' height='74'/>
        </Box>
        <Box component='div' sx={{ml: 2}}>
            <Typography variant="caption" className='dlt-app-bar-title-th'>กรมการขนส่งทางบก</Typography>
            <div className='divider-line'></div>
            <Typography variant="subtitle1" className='dlt-app-bar-title-en'>Department of Land Transport</Typography>
        </Box>
    </Box>
  )
}

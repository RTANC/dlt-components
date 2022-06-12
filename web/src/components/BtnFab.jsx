import { Fab } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'

export default function BtnFab(props) {
  return (
    <Fab color='primary' sx={{position: 'fixed', bottom: 50, right: 30}} onClick={props.onClick}>
      <AddIcon/>
    </Fab>
  )
}

import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export default function BtnAdd(props) {
  return (
    <Button variant="contained" color="warning" onClick={props.onClick} startIcon={<AddIcon />} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 24, height: 48, background: 'linear-gradient(102.79deg, #F3B922 0%, #A37A10 98.65%)', borderRadius: 3, color: 'white'}}>
      {props.label}
    </Button>
  )
}

BtnAdd.propTypes = {
    loading: PropTypes.bool
}
  
BtnAdd.defaultProps = {
  loading: false
}

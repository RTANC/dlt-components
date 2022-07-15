import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

export default function BtnAdd(props) {
  return (
    <Button variant="contained" color="warning" onClick={props.onClick}>
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

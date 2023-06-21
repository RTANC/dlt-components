import React from 'react'
import { LoadingButton } from '@mui/lab'
import PropTypes from 'prop-types'
import ClearIcon from '@mui/icons-material/Clear';

export default function BtnClear(props) {
  return (
    <LoadingButton loading={props.loading} disabled={props.loading} startIcon={<ClearIcon />} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 20, height: 44, background: 'linear-gradient(102.79deg, #808285 0%, #333333 98.65%)', borderRadius: 3, color: 'white', mx: 1}} color='secondary' variant='contained' onClick={props.onClick}>ล้างข้อมูล</LoadingButton>
  )
}

BtnClear.propTypes = {
  loading: PropTypes.bool
}
  
BtnClear.defaultProps = {
  loading: false
}
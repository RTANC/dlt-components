import React from 'react'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import PropTypes from 'prop-types'

export default function BtnSave(props) {
  return (
    <LoadingButton loading={props.loading} disabled={(props.loading || props.disabled)} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 24, height: 48, background: 'linear-gradient(102.79deg, #39C571 0%, #1D7C43 97.11%)', borderRadius: 3, color: 'white'}} color='success' variant='contained' onClick={props.onClick} startIcon={<SaveIcon />}>บันทึกข้อมูล</LoadingButton>
  )
}

BtnSave.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool
}

BtnSave.defaultProps = {
  loading: false,
  disabled: false
}
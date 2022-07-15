import React from 'react'
import { LoadingButton } from '@mui/lab'
import PropTypes from 'prop-types'

export default function BtnClear(props) {
  return (
    <LoadingButton loading={props.loading} disabled={props.loading} sx={{mx: 1}} color='secondary' variant='contained' onClick={props.onClick}>ล้างข้อมูล</LoadingButton>
  )
}

BtnClear.propTypes = {
    loading: PropTypes.bool
  }
  
  BtnClear.defaultProps = {
    loading: false
  }
import React from 'react'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import PropTypes from 'prop-types'

export default function BtnSubmit(props) {
  return (
    <LoadingButton loading={props.loading} disabled={props.loading} sx={{mx: 1}} color='success' variant='contained' onClick={props.onClick} startIcon={<SaveIcon />}>บันทึกข้อมูล</LoadingButton>
  )
}

BtnSubmit.propTypes = {
  loading: PropTypes.bool
}

BtnSubmit.defaultProps = {
  loading: false
}
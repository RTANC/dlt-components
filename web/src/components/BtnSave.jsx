import React from 'react'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import PropTypes from 'prop-types'

export default function BtnSave(props) {
  return (
    <LoadingButton loading={props.loading} disabled={props.loading} sx={{mx: 1}} color='success' variant='contained' onClick={props.onClick} startIcon={<SaveIcon />}>บันทึกข้อมูล</LoadingButton>
  )
}

BtnSave.propTypes = {
  loading: PropTypes.bool
}

BtnSave.defaultProps = {
  loading: false
}
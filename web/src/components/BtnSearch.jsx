import React from 'react'
import { LoadingButton } from '@mui/lab'
import PropTypes from 'prop-types'

export default function BtnSearch(props) {
  return (
    <LoadingButton loading={props.loading} disabled={props.loading} sx={{mx: 1}} color='info' variant='contained' onClick={props.onClick}>{props.label}</LoadingButton>
  )
}

BtnSearch.propTypes = {
    loading: PropTypes.bool,
    label: PropTypes.string
  }
  
BtnSearch.defaultProps = {
  loading: false,
  label: 'ค้นหา'
}
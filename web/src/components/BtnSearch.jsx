import React from 'react'
import { LoadingButton } from '@mui/lab'
import PropTypes from 'prop-types'

export default function BtnSearch(props) {
  return (
    <LoadingButton loading={props.loading} disabled={props.loading} sx={{mx: 1}} color='info' variant='contained' onClick={props.onClick}>ค้นหา</LoadingButton>
  )
}

BtnSearch.propTypes = {
    loading: PropTypes.bool
  }
  
BtnSearch.defaultProps = {
  loading: false
}
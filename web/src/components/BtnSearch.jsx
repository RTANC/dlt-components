import React from 'react'
import { LoadingButton } from '@mui/lab'
import PropTypes from 'prop-types'

export default function BtnSearch(props) {
  return (
    <LoadingButton loading={props.loading} disabled={props.loading} color='info' variant='contained' onClick={props.onClick} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 22, height: 46, background: 'linear-gradient(105.67deg, #9D29F8 0%, #2283F3 78.09%)', borderRadius: 3, color: 'white', mx: 1}}>{props.label}</LoadingButton>
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
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import PropTypes from 'prop-types'
import ReplyIcon from '@mui/icons-material/Reply'

export default function BtnBack(props) {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
      }
  return (
    <LoadingButton loading={props.loading} disabled={props.loading} startIcon={<ReplyIcon/>} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 22, height: 46, background: 'linear-gradient(102.79deg, #808285 0%, #333333 98.65%)', borderRadius: 3, color: 'white', mx: 1}} color='secondary' variant='contained' onClick={goBack}>ย้อนกลับ</LoadingButton>
  )
}

BtnBack.propTypes = {
  loading: PropTypes.bool
}

BtnBack.defaultProps = {
  loading: false
}
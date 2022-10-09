import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import DeleteIcon from '@mui/icons-material/Delete'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, Typography, Box } from '@mui/material'

export default function BtnDelete(props) {
    const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  BtnDelete.propTypes = {
    loading: PropTypes.bool,
    onClick: PropTypes.func
}
  
BtnDelete.defaultProps = {
    loading: false,
    onClick: handleClose
}
  return (
    <React.Fragment>
        <LoadingButton loading={props.loading} disabled={props.loading} sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 400, fontSize: 24, height: 48, background: 'linear-gradient(102.79deg, #F15353 0%, #A31212 98.65%)', borderRadius: 3, color: 'white'}} color='error' variant='contained' onClick={handleClickOpen} startIcon={<DeleteIcon />}>{props.label}</LoadingButton>
        <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
            <DialogContentText sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <DeleteIcon color='error' sx={{ fontSize: 72 }}></DeleteIcon>
                <Typography variant='h6' gutterBottom component="div">ต้องการลบข้อมูลใช่หรือไม่</Typography>
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
          <LoadingButton color='secondary' loading={props.loading} disabled={props.loading} onClick={handleClose}>ยกเลิก</LoadingButton>
          <LoadingButton color='error' loading={props.loading} disabled={props.loading} onClick={props.onClick}>ยืนยัน</LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}


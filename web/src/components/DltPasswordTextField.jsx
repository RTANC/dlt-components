import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, IconButton } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { styled } from "@mui/material/styles"

const DltPassOutlinedInput= styled(OutlinedInput)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiOutlinedInput-input': {
    backgroundColor: 'white',
    borderRadius: 4,
    border: '2px solid #ed6c02'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '0px',
  }
}))

export default function DltPasswordTextField(props) {
    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        setVisible(!visible)
    }
  return (
    <FormControl fullWidth color='warning'>
      <InputLabel shrink sx={{fontSize: 20, color: '#ed6c02'}}>{props.label}</InputLabel>
        <DltPassOutlinedInput onKeyUp={props.onKeyUp} type={visible ? 'text' : 'password'} label={props.label} value={props.value} onChange={props.onChange} error={props.error !== false} name={props.name} disabled={props.disabled} endAdornment={<InputAdornment  position="end"><IconButton color='warning' edge="end" onClick={toggleVisible}>{visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}</IconButton></InputAdornment>} autoComplete="off" placeholder={props.label}/>
        {(props.required && !(props.disabled) && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
        {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

DltPasswordTextField.propTypes = {
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    onKeyUp: PropTypes.func,
  }
  
  DltPasswordTextField.defaultProps = {
    required: false,
    error: false,
    disabled: false,
    type: 'text',
    onKeyUp: (e) => {}
  }
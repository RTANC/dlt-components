import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

import { styled } from "@mui/material/styles"

const DltOutlinedInput= styled(OutlinedInput)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiOutlinedInput-input': {
    backgroundColor: 'white',
    borderRadius: 4,
    border: '2px solid #ed6c02'
  },
  '& .MuiOutlinedInput-input:read-only': {
    backgroundColor: '#0a061f',
    borderRadius: 4,
    border: '0px',
    color: 'gray'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '0px',
  }
}))

export default function DltTextField(props) {
  return (
    <FormControl fullWidth error={props.error !== false} focused={props.focused} color="warning">
      <InputLabel shrink sx={{fontSize: 20, color: '#ed6c02'}}>{props.label}</InputLabel>
        <DltOutlinedInput onKeyUp={props.onKeyUp} type={props.type} label={props.label} value={props.value} onChange={props.onChange} name={props.name} disabled={props.disabled} readOnly={props.readOnly} autoComplete={props.autoComplete} startAdornment={props.startIcon && (<InputAdornment position="start">{props.startIcon}</InputAdornment>)} placeholder={props.placeholder}/>
        {(props.required && !(props.disabled) && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
        {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

DltTextField.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  focused: PropTypes.bool,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  onKeyUp: PropTypes.func
}

DltTextField.defaultProps = {
  required: false,
  error: false,
  disabled: false,
  readOnly: false,
  autoFocus: false,
  focused: true,
  type: 'text',
  autoComplete: 'off',
  onKeyUp: (e) => {}
}
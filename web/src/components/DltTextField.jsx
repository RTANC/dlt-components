import { FormControl, FormHelperText, TextField, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

export default function DltTextField(props) {
  return (
    <FormControl fullWidth error={props.error !== false} focused color='warning'>
      <InputLabel>{props.label}</InputLabel>
        <OutlinedInput onKeyUp={props.onKeyUp} type={props.type} label={props.label} value={props.value} onChange={props.onChange} name={props.name} disabled={props.disabled} readOnly={props.readOnly} startAdornment={props.startIcon && (<InputAdornment position="start">{props.startIcon}</InputAdornment>)} placeholder={props.placeholder}/>
        {(props.required && !(props.disabled) && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
        {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

DltTextField.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  onKeyUp: PropTypes.func
}

DltTextField.defaultProps = {
  required: false,
  error: false,
  disabled: false,
  readOnly: false,
  type: 'text',
  onKeyUp: (e) => {}
}
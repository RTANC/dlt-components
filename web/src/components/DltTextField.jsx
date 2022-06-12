import { FormControl, FormHelperText, TextField } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

export default function DltTextField(props) {
  return (
    <FormControl fullWidth>
        <TextField onKeyUp={props.onKeyUp} type={props.type} label={props.label} value={props.value} onChange={props.onChange} error={props.error !== false} name={props.name} disabled={props.disabled}></TextField>
        {(props.required && !(props.disabled) && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
        {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

DltTextField.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onKeyUp: PropTypes.func
}

DltTextField.defaultProps = {
  required: false,
  error: false,
  disabled: false,
  type: 'text',
  onKeyUp: (e) => {}
}
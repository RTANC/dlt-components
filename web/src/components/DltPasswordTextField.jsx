import { FormControl, FormHelperText, TextField, InputAdornment, InputLabel, OutlinedInput, IconButton } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export default function DltPasswordTextField(props) {
    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        setVisible(!visible)
    }
  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
        <OutlinedInput onKeyUp={props.onKeyUp} type={visible ? 'text' : 'password'} label={props.label} value={props.value} onChange={props.onChange} error={props.error !== false} name={props.name} disabled={props.disabled} autoComplete={props.autoComplete} endAdornment={<InputAdornment position="end"><IconButton onClick={toggleVisible}>{visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}</IconButton></InputAdornment>}/>
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
    autoComplete: PropTypes.string
  }
  
  DltPasswordTextField.defaultProps = {
    required: false,
    error: false,
    disabled: false,
    autoComplete: "current-password",
    type: 'text',
    onKeyUp: (e) => {}
  }
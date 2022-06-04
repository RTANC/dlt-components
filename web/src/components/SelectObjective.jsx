import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export default function SelectObjective(props) {
    const [objectives, setObjectives] = useState([{ObjectiveID: 1, Description: 'ขนถ่ายสินค้า'}, {ObjectiveID: 2, Description: 'อื่นๆ'}])
  return (
    <FormControl fullWidth error={props.error !== false}>
      <InputLabel>วัตถุประสงค์</InputLabel>
      <Select onChange={props.onChange} value={props.value} name={props.name}>
          {objectives.map((v, i) => (
            <MenuItem value={v.ObjectiveID} key={i}>{v.Description}</MenuItem>
          ))}
      </Select>
      {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
      {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}


SelectObjective.propTypes = {
    required: PropTypes.bool
  }
  
SelectObjective.defaultProps = {
  required: false,
  error: false
}
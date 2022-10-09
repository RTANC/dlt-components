import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material'

import { DltSelect } from "./DltSelect"

export default function SelectTitle(props) {
    const [titles, setTitles] = useState([{ id: 1, name: 'นาย' }, { id: 2, name: 'นาง' }, { id: 3, name: 'นางสาว' }, { id: 4, name: 'Mr' }, { id: 5, name: 'Mrs' }, { id: 6, name: 'Miss' }])
  return (
      <FormControl fullWidth color='warning' focused>
        <InputLabel sx={{fontSize: 20}} shrink>คำนำหน้า</InputLabel>
        <DltSelect onChange={props.onChange} value={props.value} name={props.name}>
          {titles.map((v, i) => (
            <MenuItem value={v.id} key={i}>{v.name}</MenuItem>
          ))}
        </DltSelect>
        {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
        {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
      </FormControl>
  )
}

SelectTitle.propTypes = {
    required: PropTypes.bool
  }

  SelectTitle.defaultProps = {
    required: false,
    error: false
  }

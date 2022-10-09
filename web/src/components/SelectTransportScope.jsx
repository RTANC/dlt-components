import React from 'react'
import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { DltSelect } from "./DltSelect"

export default function SelectTransportScope(props) {
    const [types, setTypes] = useState([{ id: 1, name: 'ในประเทศ' }, { id: 2, name: 'ระหว่างประเทศ' }, { id: 3, name: 'ในประเทศ/ระหว่างประเทศ' }])
  return (
    <FormControl fullWidth color='warning' focused>
        <InputLabel sx={{fontSize: 20}} shrink>ขอบเขตพื้นที่</InputLabel>
        <DltSelect onChange={props.onChange} value={props.value} name={props.name}>
          {types.map((v, i) => (
            <MenuItem value={v.id} key={i}>{v.name}</MenuItem>
          ))}
        </DltSelect>
        {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
        {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

SelectTransportScope.propTypes = {
    required: PropTypes.bool
}

SelectTransportScope.defaultProps = {
    required: false,
    error: false
}
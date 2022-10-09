import React from 'react'
import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { DltSelect } from "./DltSelect"

export default function SelectTransportType(props) {
    const [types, setTypes] = useState([{ id: 1, name: 'ไม่ประจำทาง' }, { id: 2, name: 'ส่วนบุคคล' }])
  return (
    <FormControl fullWidth color='warning' focused>
        <InputLabel sx={{fontSize: 20}} shrink>ประเภทการขนส่ง</InputLabel>
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

SelectTransportType.propTypes = {
    required: PropTypes.bool
}

SelectTransportType.defaultProps = {
    required: false,
    error: false
}

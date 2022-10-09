import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material'
import React from 'react'

import { DltSelect } from "./DltSelect"

export default function SelectIsConfirm(props) {
  return (
    <FormControl fullWidth color='warning' focused>
        <InputLabel sx={{fontSize: 20}} shrink>{props.label}</InputLabel>
        <DltSelect onChange={props.onChange} value={props.value} name={props.name}>
            <MenuItem value={true}>ยืนยันแล้ว</MenuItem>
            <MenuItem value={false}>ยังไม่ยืนยัน</MenuItem>
        </DltSelect>
    </FormControl>
  )
}

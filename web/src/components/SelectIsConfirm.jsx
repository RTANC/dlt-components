import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material'
import React from 'react'

export default function SelectIsConfirm(props) {
  return (
    <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Select onChange={props.onChange} value={props.value} name={props.name}>
            <MenuItem value={true}>ยืนยันแล้ว</MenuItem>
            <MenuItem value={false}>ยังไม่ยืนยัน</MenuItem>
        </Select>
    </FormControl>
  )
}

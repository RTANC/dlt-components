import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import React from 'react'

export default function CheckBoxChPasswd(props) {
  return (
    <FormControl fullWidth>
      <FormGroup>
        <FormControlLabel label='เปลี่ยน Password' control={<Checkbox checked={props.value} onChange={props.onChange}></Checkbox>}></FormControlLabel>
      </FormGroup>
    </FormControl>
  )
}

import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

export default function CheckBoxVehicleStatus(props) {
  return (
    <FormControl fullWidth>
        <FormGroup>
            <FormControlLabel label='ยังไม่ออกจากสถานี' control={<Checkbox checked={props.isVehicleInStation} onChange={props.onChange} name='isVehicleInStation'></Checkbox>}></FormControlLabel>
            <FormControlLabel label='น้ำหนักเกิน' control={<Checkbox checked={props.isOverWeight} onChange={props.onChange} name='isOverWeight'></Checkbox>}></FormControlLabel>
        </FormGroup>
    </FormControl>
  )
}

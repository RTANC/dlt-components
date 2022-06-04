import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

export default function CheckBoxVehicleOut(props) {
  return (
    <FormControl fullWidth>
        <FormGroup >
            <FormControlLabel sx={{display: 'flex', justifyContent: 'end'}} label='รถออกจากสถานีแล้ว' control={<Checkbox checked={props.value} onChange={props.onChange} name='isVehicleOut'></Checkbox>}></FormControlLabel>
        </FormGroup>
    </FormControl>
  )
}

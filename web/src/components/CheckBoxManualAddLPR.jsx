import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

export default function CheckBoxManualAddLPR(props) {
  return (
    <FormControl fullWidth>
        <FormGroup>
            <FormControlLabel label='บันทึกเอง' control={<Checkbox checked={props.value} onChange={props.onChange} name='isManualAddLPR'></Checkbox>}></FormControlLabel>
        </FormGroup>
    </FormControl>
  )
}

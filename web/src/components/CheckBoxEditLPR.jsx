import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

export default function CheckBoxEditLPR(props) {
  return (
    <FormControl fullWidth>
        <FormGroup >
            <FormControlLabel sx={{display: 'flex', justifyContent: 'end'}} label='แก้ไขเลขทะเบียน' control={<Checkbox checked={props.value} onChange={props.onChange} name='editLPR'></Checkbox>}></FormControlLabel>
        </FormGroup>
    </FormControl>
  )
}

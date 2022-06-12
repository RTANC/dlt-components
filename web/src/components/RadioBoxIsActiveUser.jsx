import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

export default function RadioBoxIsActiveUser(props) {
  return (
    <FormControl fullWidth>
      <FormLabel sx={{display: 'flex', alignContent: 'start'}}>สถานะผู้ใช้งาน</FormLabel>
        <RadioGroup value={props.value} name={props.name} onChange={props.onChange} row>
            <FormControlLabel value={true} label='Active' control={<Radio/>}></FormControlLabel>
            <FormControlLabel value={false} label='InActive' control={<Radio/>}></FormControlLabel>
        </RadioGroup>
    </FormControl>
  )
}

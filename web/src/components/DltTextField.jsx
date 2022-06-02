import { FormControl, TextField } from '@mui/material'
import React from 'react'

export default function DltTextField(props) {
  return (
    <FormControl fullWidth>
        <TextField label={props.label} value={props.value} onChange={props.onChange}></TextField>
    </FormControl>
  )
}

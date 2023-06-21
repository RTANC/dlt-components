import { FormControl, InputAdornment, OutlinedInput, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'

export default function DltSearchBar(props) {
  return (
    <FormControl fullWidth>
        <OutlinedInput value={props.value} placeholder='Search' onChange={props.onChange} autoComplete='on' endAdornment={<InputAdornment position="end"><IconButton edge='end'><SearchIcon/></IconButton></InputAdornment>}></OutlinedInput>   
    </FormControl>
  )
}

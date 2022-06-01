import React from 'react'
import {TextField, Box, InputAdornment, FormControl} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { Calendar } from 'mdi-material-ui'

import thLocale from 'date-fns/locale/th'

export default function DltDatePicker(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={thLocale}>
        <FormControl fullWidth>
          <MobileDatePicker
            label={props.label}
            mask='__/__/____'
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            renderInput={(params) => <TextField {...params} InputProps={{startAdornment: (
              <InputAdornment position="start">
                <Calendar />
              </InputAdornment>
            )}}/>}
          />
        </FormControl>
      </LocalizationProvider>
    </Box>
  )
}

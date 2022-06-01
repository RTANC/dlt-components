import React from 'react'
import {TextField, Box, InputAdornment, FormControl} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import { Calendar } from 'mdi-material-ui'

import thLocale from 'date-fns/locale/th'

export default function DltDateTimePicker(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={thLocale}>
        <FormControl fullWidth>
          <MobileDateTimePicker
            label={props.label}
            inputFormat='dd/MM/yyyy HH:mm'
            mask='__/__/____ __:__'
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

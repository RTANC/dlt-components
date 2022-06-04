import React from 'react'
import {TextField, Box, InputAdornment, FormControl, FormHelperText} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import { Calendar } from 'mdi-material-ui'
import PropTypes from 'prop-types'
import thLocale from 'date-fns/locale/th'

export default function DltDateTimePicker(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={thLocale}>
        <FormControl fullWidth error={props.error !== false}>
          <MobileDateTimePicker
            label={props.label}
            inputFormat='dd/MM/yyyy HH:mm'
            mask='__/__/____ __:__'
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            minDateTime={props.minDateTime}
            maxDateTime={props.maxDateTime}
            disabled={props.disabled}
            renderInput={(params) => <TextField {...params} InputProps={{startAdornment: (
              <InputAdornment position="start">
                <Calendar />
              </InputAdornment>
            )}}/>}
          />
          {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
          {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
        </FormControl>
      </LocalizationProvider>
    </Box>
  )
}

DltDateTimePicker.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

DltDateTimePicker.defaultProps = {
  required: false,
  error: false,
  disabled: false,
  onChange: function () {
    return null
  }
}

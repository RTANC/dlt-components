import React from 'react'
import {TextField, Box, InputAdornment, FormControl, FormHelperText} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import { Calendar } from 'mdi-material-ui'
import PropTypes from 'prop-types'
import thLocale from 'date-fns/locale/th'
import moment from 'moment-timezone'

export default function DltDateTimePicker(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={thLocale}>
        <FormControl fullWidth error={props.error !== false}>
          <MobileDateTimePicker
            label={props.label}
            inputFormat='MM/dd/yyyy HH:mm'
            // mask='__/__/____ __:__'
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            minDateTime={props.minDateTime}
            maxDateTime={props.maxDateTime}
            disabled={props.disabled}
            readOnly={props.readOnly}
            renderInput={(params) => {params.inputProps.value =  moment(moment(params.inputProps.value).format('MM/DD/YYYY')).isValid() ? moment(params.inputProps.value).add(543, 'y').format('DD/MM/YYYY HH:mm') : ''; return <TextField {...params} />}}
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
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
}

DltDateTimePicker.defaultProps = {
  required: false,
  error: false,
  disabled: false,
  readOnly: false,
  onChange: function () {
    return null
  }
}

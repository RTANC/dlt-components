import React from 'react'
import {TextField, Box, InputAdornment, FormControl, FormHelperText} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { Calendar } from 'mdi-material-ui'

import PropTypes from 'prop-types'
import thLocale from 'date-fns/locale/th'
import moment from 'moment'

export default function DltYearPicker(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={thLocale}>
        <FormControl fullWidth  error={props.error !== false}>
          <MobileDatePicker
            label={props.label}
            inputFormat='MM/dd/yyyy'
            views={['year']}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            minDateTime={props.minDateTime}
            maxDateTime={props.maxDateTime}
            disabled={props.disabled}
            readOnly={props.readOnly}
            renderInput={(params) => {params.inputProps.value =  (typeof(params.inputProps.value) !== 'undefined' && params.inputProps.value !== null && params.inputProps.value !== '') ? moment(params.inputProps.value).add(543, 'y').format('YYYY') : ''; return <TextField {...params} focused color={(props.error !== false) ? 'error' : 'warning'}/>}}
          />
          {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
          {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
        </FormControl>
      </LocalizationProvider>
    </Box>
  )
}

DltYearPicker.propTypes = {
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
}
  
DltYearPicker.defaultProps = {
    required: false,
    error: false,
    disabled: false,
    readOnly: false,
    onChange: function () {
      return null
    }
}
import React from 'react'
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import PropTypes from 'prop-types'
import thLocale from 'date-fns/locale/th'
import moment from 'moment'

import { styled } from "@mui/material/styles"

const DltOutlinedInput= styled(OutlinedInput)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiOutlinedInput-input': {
    backgroundColor: 'white',
    borderRadius: 4,
    border: '2px solid #ed6c02'
  },
  '& .MuiOutlinedInput-input:read-only': {
    backgroundColor: '#0a061f',
    borderRadius: 4,
    border: '0px',
    color: 'gray'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '0px',
  }
}))

export default function DltDateTimePicker(props) {
  return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={thLocale}>
        <FormControl fullWidth error={props.error !== false} color={(props.error !== false) ? 'error' : 'warning'}>
        <InputLabel shrink sx={{fontSize: 20, color: '#ed6c02'}}>{props.label}</InputLabel>
          <MobileDateTimePicker
            label={props.label}
            views={['year', 'month', 'day', 'hours', 'minutes']}
            inputFormat='MM/dd/yyyy HH:mm'
            // mask='__/__/____ __:__'
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            minDateTime={props.minDateTime}
            maxDateTime={props.maxDateTime}
            disabled={props.disabled}
            readOnly={props.readOnly}
            renderInput={(params) => {params.inputProps.value =  moment(moment(params.inputProps.value).format('MM/DD/YYYY')).isValid() ? moment(params.inputProps.value).add(543, 'y').format('DD/MM/YYYY HH:mm') : ''; params.inputProps.readOnly = props.readOnly; return <DltOutlinedInput {...params} />}}
          />
          {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
          {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
        </FormControl>
      </LocalizationProvider>
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

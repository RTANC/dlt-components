import React from 'react'
import { InputLabel, OutlinedInput, FormControl, FormHelperText } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'

import PropTypes from 'prop-types'
import thLocale from 'date-fns/locale/th'
import moment from 'moment'

import { styled } from "@mui/material/styles"

const DltOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiOutlinedInput-input': {
    backgroundColor: 'white',
    borderRadius: 4,
    border: '2px solid #ed6c02'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '0px',
  }
}))

export default function DltDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={thLocale}>
      <FormControl fullWidth error={props.error !== false} color={(props.error !== false) ? 'error' : 'warning'}>
      <InputLabel shrink sx={{fontSize: 20, color: '#ed6c02'}}>{props.label}</InputLabel>
        <MobileDatePicker
          label={props.label}
          views={['year', 'month', 'day']}
          inputFormat='MM/dd/yyyy'
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          minDateTime={props.minDateTime}
          maxDateTime={props.maxDateTime}
          disabled={props.disabled}
          readOnly={props.readOnly}
          renderInput={(params) => {params.inputProps.value =  moment(moment(params.inputProps.value).format('MM/DD/YYYY')).isValid() ? moment(params.inputProps.value).add(543, 'y').format('DD/MM/YYYY') : ''; return <DltOutlinedInput {...params}/>}}
        />
        {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
        {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
      </FormControl>
    </LocalizationProvider>
  )
}

DltDatePicker.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
}

DltDatePicker.defaultProps = {
  required: false,
  error: false,
  disabled: false,
  readOnly: false,
  onChange: function () {
    return null
  }
}

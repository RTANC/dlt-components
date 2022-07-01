import { Autocomplete, CircularProgress, FormControl, FormHelperText, InputLabel, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getLicensePlates } from '../services/transports'
import moment from 'moment-timezone'

export default function AutoCompleteSearchLP(props) {
    const [value, setValue] = useState('')
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchLicenseplates = async (e, v) => {
      try {
        setLoading(true)
        if (v !== '') {
          const data = (await getLicensePlates(props.station, v)).data
          console.log(v)
          setOptions(data)
        }
        
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

  return (
    <FormControl fullWidth>
        <Autocomplete
          // value={value}
          disableClearable
          onChange={props.onChange}
          onInputChange={fetchLicenseplates}
          // isOptionEqualToValue={(option, value) => option.TransportID === value}
          filterOptions={(x) => x}
          options={options}
          // loading={loading}
          autoComplete
          includeInputInList
          filterSelectedOptions
          getOptionLabel={(option) => ''}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.TransportID}>
              <img
                loading="lazy"
                width="100"
                src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=100&h=100&fit=crop&auto=format'
              />
              <img
                loading="lazy"
                width="100"
                src='https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=100&h=100&fit=crop&auto=format'
              />
              วัน และ เวลาเข้า: {moment(option.TimeStampIn).format('DD/MM/YYYY HH:mm:ss')} <br /> หน้า: {option.F1M + ' ' + option.F1MPNAME} <br /> หลัง: {option.R1M + ' ' + option.R1MPNAME}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params}
            label='ค้นหาจากเลขทะเบียน'
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            />
          )}
        />
        {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
        {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

AutoCompleteSearchLP.propTypes = {
    required: PropTypes.bool
}

AutoCompleteSearchLP.defaultProps = {
    required: false,
    error: false
}
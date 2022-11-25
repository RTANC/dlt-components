import { Autocomplete, CircularProgress, FormControl, FormHelperText, TextField, Box } from '@mui/material';
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getLicensePlates } from '../services/transports'
import { dateTimeFormatter, getImageURL, null2empty } from '../services/utils';


export default function AutoCompleteSearchLP(props) {
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchLicenseplates = async (e, v, r) => {
      try {
        setLoading(true)
        if (v !== '') {
          const data = (await getLicensePlates(props.station, v)).data
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
            <Box component="li" sx={{ '& > img': { mr: 1, flexShrink: 0 } }} {...props} key={option.VehicleInID}>
              <img
                loading="lazy"
                width="25%"
                src={getImageURL(option.StationID, option.LaneID, option.TimeStampIn, option.ImageRef, 0)}
              />
              <img
                loading="lazy"
                width="25%"
                src={getImageURL(option.StationID, option.LaneID, option.TimeStampIn, option.ImageRef, 1)}
              />
              วัน และ เวลาเข้า: {dateTimeFormatter(option.TimeStampIn)} <br /> หน้า: {null2empty(option.F1A)+ ' ' + null2empty(option.F1APName)} <br /> หลัง: {null2empty(option.R1A) + ' ' + null2empty(option.R1APName)}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params}
            placeholder='ค้นหาจากเลขทะเบียน'
            color='warning'
            fullWidth
            focused
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
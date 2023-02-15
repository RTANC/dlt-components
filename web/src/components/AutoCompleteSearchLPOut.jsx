import { Autocomplete, CircularProgress, FormControl, FormHelperText, TextField, Box } from '@mui/material';
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getLicensePlatesOut } from '../services/transports'
import { dateTimeFormatter, getImageURL, null2empty } from '../services/utils';

export default function AutoCompleteSearchLPOut(props) {
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchLicenseplates = async (e, v, r) => {
      try {
        setLoading(true)
        if (v !== '') {
          const data = (await getLicensePlatesOut(props.station, v, props.timeStampIn)).data
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
            <Box component="li" sx={{ '& > img': { mr: 1, flexShrink: 0 } }} {...props} key={option.VehicleOutID}>
              <img
                loading="lazy"
                width="25%"
                src={getImageURL(option.StationID, option.LaneID, option.TimeStampOut, option.ImageRef, 0)}
              />
              <img
                loading="lazy"
                width="25%"
                src={getImageURL(option.StationID, option.LaneID, option.TimeStampOut, option.ImageRef, 1)}
              />
              วัน และ เวลาออก: {dateTimeFormatter(option.TimeStampOut)} <br /> หน้า: {null2empty(option.F2A)+ ' ' + null2empty(option.F2APName)} <br /> หลัง: {null2empty(option.R2A) + ' ' + null2empty(option.R2APName)}
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

AutoCompleteSearchLPOut.propTypes = {
    required: PropTypes.bool
}

AutoCompleteSearchLPOut.defaultProps = {
    required: false,
    error: false
}
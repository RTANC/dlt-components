import { Autocomplete, CircularProgress, FormControl, FormHelperText, InputLabel, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getLicensePlates } from '../services/transports';

export default function AutoCompleteSearchLP(props) {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const loading = open && options.length === 0

    const fetchLicenseplates = async () => {
      try {
        const data = (await getLicensePlates()).data
        setOptions(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
        fetchLicenseplates()
      }, [loading])

      useEffect(() => {
        if (!open) {
          setOptions([])
        }
      }, [open])
  return (
    <FormControl fullWidth>
        <Autocomplete
          value={props.value}
          disableClearable
          open={open}
          // onChange={props.onChange}
          // onInputChange={(e, v) => {console.log(v)}}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          isOptionEqualToValue={(option, value) => option.id === value}
          options={options}
          loading={loading}
          getOptionLabel={(option) => { return option.id.toString()}}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.id}>
              <img
                loading="lazy"
                width="164"
                src={option.f1}
              />
              <img
                loading="lazy"
                width="164"
                src={option.r1}
              />
              {option.timeStampIn} หน้า:({option.front}) หลัง:{option.rear}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label='ค้นหาจากเลขทะเบียน'
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
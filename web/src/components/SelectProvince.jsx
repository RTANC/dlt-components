import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getProvinces } from '../services/transports'
import PropTypes from 'prop-types'

export default function SelectProvince(props) {
    const [provinces, setProvinces] = useState([])
    const fetchProvinces = async () => {
        try {
          const data = (await getProvinces()).data
          setProvinces(data)
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(() => {
        fetchProvinces()
      }, [])
  return (
    <FormControl fullWidth error={props.error !== false}>
      <InputLabel>{props.label}</InputLabel>
      <Select onChange={props.onChange} value={props.value} name={props.name}>
          {provinces.map((v, i) => (
            <MenuItem value={v.ProvinceID} key={i}>{v.ProvinceName}</MenuItem>
          ))}
      </Select>
      {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
      {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

SelectProvince.propTypes = {
  required: PropTypes.bool
}

SelectProvince.defaultProps = {
  required: false,
  error: false
}
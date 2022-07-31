import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getVehicleClasses } from '../services/vehicles'
import PropTypes from 'prop-types'

export default function SelectVehicleClass(props) {
    const [vehicleClasses, setVehicleClasses] = useState([])
    const fetchVehicleClasses = async () => {
        try {
          const data = (await getVehicleClasses()).data
          setVehicleClasses(data)
        } catch (error) {
          console.log(error)
        }
      }
  
      useEffect(() => {
        fetchVehicleClasses()
      }, [])
  return (
    <FormControl fullWidth error={props.error !== false} focused color='warning'>
      <InputLabel>ประเภทรถ</InputLabel>
      <Select onChange={props.onChange} value={props.value} name={props.name} label='ประเภทรถ'>
          {vehicleClasses.map((v, i) => (
            <MenuItem value={v.VehicleClassID} key={i}>{v.Description}</MenuItem>
          ))}
      </Select>
      {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
      {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

SelectVehicleClass.propTypes = {
  required: PropTypes.bool
}

SelectVehicleClass.defaultProps = {
  required: false,
  error: false
}

import { FormControl, FormHelperText, MenuItem, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getVehicleClasses } from '../services/vehicles'
import PropTypes from 'prop-types'

import { DltSelect } from "./DltSelect"

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
    <FormControl fullWidth error={props.error !== false} color='warning' focused>
      <InputLabel sx={{fontSize: 20}} shrink>ประเภทรถ</InputLabel>
      <DltSelect onChange={props.onChange} value={props.value} name={props.name}>
        {!props.required && <MenuItem value="">&nbsp;</MenuItem>}
          {vehicleClasses.map((v, i) => (
            <MenuItem value={v.VehicleClassID} key={i}>{v.Description}</MenuItem>
          ))}
      </DltSelect>
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

import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getVehicleGroups } from '../services/vehicles'
import PropTypes from 'prop-types'

import { DltSelect } from "./DltSelect"

export default function SelectVehicleGroup(props) {
  const [vehicleGroups, setVehicleGroups] = useState([])
  const fetchVehicleGroups = async () => {
      try {
        const data = (await getVehicleGroups()).data
        setVehicleGroups(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchVehicleGroups()
    }, [])
return (
  <FormControl fullWidth error={props.error !== false} color='warning' focused>
    <InputLabel sx={{fontSize: 20}} shrink>กลุ่มรถ</InputLabel>
    <DltSelect onChange={props.onChange} value={props.value} name={props.name}>
      {!props.required && <MenuItem value="">&nbsp;</MenuItem>}
        {vehicleGroups.map((v, i) => (
          <MenuItem value={v.VehicleGroupID} key={i}>{v.Description}</MenuItem>
        ))}
    </DltSelect>
    {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
    {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
  </FormControl>
)
}

SelectVehicleGroup.propTypes = {
  required: PropTypes.bool
}

SelectVehicleGroup.defaultProps = {
  required: false,
  error: false
}
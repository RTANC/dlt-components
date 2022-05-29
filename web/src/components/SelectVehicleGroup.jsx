import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getVehicleGroups } from '../services/vehicles'

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
  <FormControl fullWidth>
    <InputLabel>กลุ่มรถ</InputLabel>
    <Select onChange={props.onChange} value={props.value} name="vehicleGroup">
        {vehicleGroups.map((v, i) => (
          <MenuItem value={v.VehicleGroupID} key={i}>{v.Description}</MenuItem>
        ))}
    </Select>
    <FormHelperText>*จำเป็น</FormHelperText>
  </FormControl>
)
}

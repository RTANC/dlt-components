import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getVehicleClasses } from '../services/vehicles'

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
    <FormControl fullWidth>
      <InputLabel>ประเภทรถ</InputLabel>
      <Select onChange={props.onChange} value={props.value} name="vehicleClass">
          {vehicleClasses.map((v, i) => (
            <MenuItem value={v.VehicleClassID} key={i}>{v.Description}</MenuItem>
          ))}
      </Select>
      <FormHelperText>*จำเป็น</FormHelperText>
    </FormControl>
  )
}

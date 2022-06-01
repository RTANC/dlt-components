import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getProvinces } from '../services/provinces'

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
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select onChange={props.onChange} value={props.value} name={props.name}>
          {provinces.map((v, i) => (
            <MenuItem value={v.ProvinceID} key={i}>{v.ProvinceName}</MenuItem>
          ))}
      </Select>
      <FormHelperText>*จำเป็น</FormHelperText>
    </FormControl>
  )
}

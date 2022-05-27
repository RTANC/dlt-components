import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState } from 'react'

export default function SelectStation(props) {
    const [stations, setStations] = useState(['พุทธมณฑล', 'คลองหลวง', 'ร่มเกล้า'])
    
  return (
    <FormControl fullWidth>
      <InputLabel>สถานี</InputLabel>
      <Select onChange={props.onChange} value={props.value}>
          {stations.map((v, i) => (
            <MenuItem value={v} key={i}>{v}</MenuItem>
          ))}
      </Select>
      <FormHelperText>*จำเป็น</FormHelperText>
    </FormControl>
  )
}

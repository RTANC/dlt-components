import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getStations } from '../services/stations'

export default function SelectStation(props) {
    // const [stations, setStations] = useState(['พุทธมณฑล', 'คลองหลวง', 'ร่มเกล้า'])
    const [stations, setStations] = useState([])

    const fetchStations = async () => {
      try {
        const data = (await getStations()).data
        setStations(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchStations()
    }, [])
    
    
  return (
    <FormControl fullWidth>
      <InputLabel>สถานี</InputLabel>
      <Select onChange={props.onChange} value={props.value}>
          {stations.map((v, i) => (
            <MenuItem value={v.StationID} key={i}>{v.StationName}</MenuItem>
          ))}
      </Select>
      <FormHelperText>*จำเป็น</FormHelperText>
    </FormControl>
  )
}

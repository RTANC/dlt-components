import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getStations } from '../services/stations'
import PropTypes from 'prop-types'

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
    <FormControl fullWidth error={props.error !== false} disabled={props.disabled}>
      <InputLabel>สถานี</InputLabel>
      <Select onChange={props.onChange} value={props.value} name={props.name}>
          {stations.map((v, i) => (
            <MenuItem value={v.StationID} key={i}>{v.StationName}</MenuItem>
          ))}
      </Select>
      {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
      {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

SelectStation.propTypes = {
  required: PropTypes.bool
}

SelectStation.defaultProps = {
  required: false,
  error: false,
  disabled: false
}
import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getStations } from '../services/stations'
import PropTypes from 'prop-types'

import { styled } from "@mui/material/styles"

const DltSelect = styled(Select)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    backgroundColor: 'white'
  }
}))
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
    <FormControl fullWidth error={props.error !== false} disabled={props.disabled} color='warning' focused>
      <InputLabel sx={{fontSize: 20}}>สถานี</InputLabel>
      <DltSelect onChange={props.onChange} value={props.value} name={props.name} inputProps={{ readOnly: props.readOnly }}>
          {stations.map((v, i) => (
            <MenuItem value={v.StationID} key={i}>{v.StationName}</MenuItem>
          ))}
      </DltSelect>
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
  disabled: false,
  readOnly: false
}
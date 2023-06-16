import { FormControl, FormHelperText, MenuItem, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getStations } from '../services/stations'
import PropTypes from 'prop-types'

import { DltSelect } from "./DltSelect"

// const DltSelect = styled(Select)(({ theme }) => ({
//   'label + &': {
//     marginTop: theme.spacing(3)
//   },
//   '& .MuiInputBase-input': {
//     backgroundColor: 'white'
//   }
// }))

export default function SelectStation(props) {
    const [stations, setStations] = useState([])

    const fetchStations = async () => {
      try {
        const data = (await getStations()).data
        data.unshift({
          StationID: 0,
          StationName: 'สำนักงานส่วนกลาง'
        })
        setStations(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchStations()
    }, [])
    
    
  return (
    <FormControl fullWidth error={props.error !== false} disabled={props.disabled} readOnly={props.readOnly} color='warning' focused sx={{'label.Mui-disabled': {color: '#ed6c02'}}}>
      <InputLabel sx={{fontSize: 20}} shrink>สถานี</InputLabel>
      <DltSelect onChange={props.onChange} value={props.value} name={props.name} sx={{'.Mui-disabled': {backgroundColor: '#0a061f', color: 'gray', '-webkit-text-fill-color': 'gray'}}}>
          {stations.map((v, i) => !(props.admin || v.StationID !== 0) || (
            <MenuItem value={v.StationID} key={i}>{v.StationName}</MenuItem>
          ))}
      </DltSelect>
      {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
      {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

SelectStation.propTypes = {
  required: PropTypes.bool,
  admin: PropTypes.bool
}

SelectStation.defaultProps = {
  required: false,
  error: false,
  disabled: false,
  readOnly: false,
  admin: false
}
import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getAgencies } from '../services/agencies'
import PropTypes from 'prop-types'

export default function SelectAgency(props) {
    const [agencies, setAgencies] = useState([])

    const fetchAgencies = async () => {
      try {
        const data = (await getAgencies(props.stationId)).data
        setAgencies(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchAgencies()
    }, [props.stationId])

  return (
    <FormControl fullWidth error={props.error !== false} disabled={props.disabled}>
      <InputLabel>หน่วยงาน</InputLabel>
      <Select onChange={props.onChange} value={props.value} name={props.name}>
        {!(props.required) && <MenuItem value=""><em>-</em></MenuItem>}
          {agencies.map((v, i) => (
            <MenuItem value={v.CompanyID} key={i}>{v.CompanyName}</MenuItem>
          ))}
      </Select>
      {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
      {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

SelectAgency.propTypes = {
    required: PropTypes.bool,
    stationId: PropTypes.number
  }

  SelectAgency.defaultProps = {
    required: false,
    error: false,
    stationId: 1,
    disabled: false
  }
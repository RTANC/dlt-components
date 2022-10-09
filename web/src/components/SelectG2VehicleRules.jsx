import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getG2Rules } from '../services/managements'

import { DltSelect } from "./DltSelect"

export default function SelectG2VehicleRules(props) {
    const [rules, setRules] = useState([])

    const fetchRules = async () => {
      try {
        const data = (await getG2Rules()).data
        setRules(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchRules()
    }, [])
  return (
    <FormControl fullWidth error={props.error !== false} disabled={props.disabled} color='warning' focused>
      <InputLabel sx={{fontSize: 20}} shrink>เกณฑ์</InputLabel>
      <DltSelect onChange={props.onChange} value={props.value} name={props.name} inputProps={{ readOnly: props.readonly }}>
          {rules.map((v, i) => (
            <MenuItem value={v.RuleID} key={i}>{'(' + v.RuleID + ') ' + v.RuleDescription}</MenuItem>
          ))}
      </DltSelect>
      {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
      {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

SelectG2VehicleRules.propTypes = {
    required: PropTypes.bool
  }
  
  SelectG2VehicleRules.defaultProps = {
    required: false,
    error: false,
    disabled: false,
    readonly: false
  }

import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getCompany } from '../services/company'
import PropTypes from 'prop-types'

import { DltSelect } from "./DltSelect"

export default function SelectCompany(props) {
    // const [stations, setStations] = useState(['พุทธมณฑล', 'คลองหลวง', 'ร่มเกล้า'])
    const [company, setCompany] = useState([])

    const fetchCompany = async () => {
      try {
        const data = (await getCompany(props.station)).data
        setCompany(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchCompany()
    }, [props.station])
   
  return (
    <FormControl fullWidth error={props.error !== false} disabled={props.disabled} readOnly={props.readOnly} color='warning' focused sx={{'label.Mui-disabled': {color: '#ed6c02'}}}>
      <InputLabel sx={{fontSize: 20}} shrink>ผู้ประกอบการ</InputLabel>
      <DltSelect onChange={props.onChange} value={props.value} name={props.name} sx={{'.Mui-disabled': {backgroundColor: '#0a061f', color: 'gray', '-webkit-text-fill-color': 'gray'}}}>
          {company.map((v, i) => (
            <MenuItem value={v.CompanyID} key={i}>{v.CompanyName}</MenuItem>
          ))}
      </DltSelect>
      {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
      {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

SelectCompany.propTypes = {
  required: PropTypes.bool
}

SelectCompany.defaultProps = {
  required: false,
  error: false,
  disabled: false
}
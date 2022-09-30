import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getCompany } from '../services/company'
import PropTypes from 'prop-types'

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
    <FormControl fullWidth error={props.error !== false} color='warning'>
      <InputLabel>ผู้ประกอบการ</InputLabel>
      <Select onChange={props.onChange} value={props.value} name={props.name} label='ผู้ประกอบการ'>
          {company.map((v, i) => (
            <MenuItem value={v.CompanyID} key={i}>{v.CompanyName}</MenuItem>
          ))}
      </Select>
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
  error: false
}
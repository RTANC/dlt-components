import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getCompany } from '../services/company'

export default function SelectCompany(props) {
    // const [stations, setStations] = useState(['พุทธมณฑล', 'คลองหลวง', 'ร่มเกล้า'])
    const [company, setCompany] = useState([])

    const fetchCompany = async () => {
      try {
        const data = (await getCompany()).data
        setCompany(data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchCompany()
    }, [])
    
    
  return (
    <FormControl fullWidth>
      <InputLabel>ผู้ประกอบการ</InputLabel>
      <Select onChange={props.onChange} value={props.value} name={props.name}>
          {company.map((v, i) => (
            <MenuItem value={v.CompanyID} key={i}>{v.CompanyName}</MenuItem>
          ))}
      </Select>
      <FormHelperText>*จำเป็น</FormHelperText>
    </FormControl>
  )
}

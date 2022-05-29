import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getGoodCategory } from '../services/goods'

export default function SelectGoodCategory(props) {

    const [goodCategory, setGoodCategory] = useState([])

    const fetchGoodCategory = async () => {
        try {
          const data = (await getGoodCategory()).data
          setGoodCategory(data)
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(() => {
        fetchGoodCategory()
      }, [])
  return (
    <FormControl fullWidth>
      <InputLabel>ประเภทสินค้า</InputLabel>
      <Select onChange={props.onChange} value={props.value} name="goodCategory">
          {goodCategory.map((v, i) => (
            <MenuItem value={v.CategoryID} key={i}>{v.CategoryName}</MenuItem>
          ))}
      </Select>
      <FormHelperText>*จำเป็น</FormHelperText>
    </FormControl>
  )
}

import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getGoodCategory } from '../services/goods'
import PropTypes from 'prop-types'

import { DltSelect } from "./DltSelect"

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
    <FormControl fullWidth error={props.error !== false} color='warning' focused>
      <InputLabel sx={{fontSize: 20}} shrink>ประเภทสินค้า</InputLabel>
      <DltSelect onChange={props.onChange} value={props.value} name={props.name}>
        {!props.required && <MenuItem value="">&nbsp;</MenuItem>}
          {goodCategory.map((v, i) => (
            <MenuItem value={v.CategoryID} key={i}>{v.CategoryName}</MenuItem>
          ))}
      </DltSelect>
      {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
      {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

SelectGoodCategory.propTypes = {
  required: PropTypes.bool
}

SelectGoodCategory.defaultProps = {
  required: false,
  error: false
}

import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { DltSelect } from "./DltSelect"

export default function SelectUserRole(props) {
    const [userRoles, setUserRoles] = useState(props.forSearch ? [{id: -1, name: 'ทั้งหมด'}, {id: 0, name: 'ผู้ดูแลระบบ'}, {id: 1, name: 'กลุ่มผู้ใช้ระดับกรม'}, {id: 2, name: 'กลุ่มผู้ใช้ระดับสถานี'}, {id: 3, name: 'กลุ่มผู้ใช้ระดับผู้ประกอบการ'}] : [{id: 0, name: 'ผู้ดูแลระบบ'}, {id: 1, name: 'กลุ่มผู้ใช้ระดับกรม'}, {id: 2, name: 'กลุ่มผู้ใช้ระดับสถานี'}, {id: 3, name: 'กลุ่มผู้ใช้ระดับผู้ประกอบการ'}])
  return (
    <FormControl fullWidth error={props.error !== false} disabled={props.disabled} readOnly={props.readOnly} color='warning' focused sx={{'label.Mui-disabled': {color: '#ed6c02'}}}>
      <InputLabel sx={{fontSize: 20}} shrink>กลุ่มผู้ใช้</InputLabel>
      <DltSelect onChange={props.onChange} value={props.value} name={props.name} sx={{'.Mui-disabled': {backgroundColor: '#0a061f', color: 'gray', '-webkit-text-fill-color': 'gray'}}}>
          {userRoles.map((v, i) => (
            <MenuItem value={v.id} key={i}>{v.name}</MenuItem>
          ))}
      </DltSelect>
      {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
      {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

SelectUserRole.propTypes = {
    required: PropTypes.bool,
    forSearch: PropTypes.bool
  }
  
  SelectUserRole.defaultProps = {
    required: false,
    error: false,
    disabled: false,
    readOnly: false,
    forSearch: false
  }

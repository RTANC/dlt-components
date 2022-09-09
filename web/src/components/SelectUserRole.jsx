import { FormControl, FormHelperText, MenuItem, Select, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
export default function SelectUserRole(props) {
    const [userRoles, setUserRoles] = useState([{id: 0, name: 'ผู้ดูแลระบบ'}, {id: 1, name: 'กลุ่มผู้ใช้ระดับกรม'}, {id: 2, name: 'กลุ่มผู้ใช้ระดับสถานี'}, {id: 3, name: 'กลุ่มผู้ใช้ระดับผู้ประกอบการ'}])
  return (
    <FormControl fullWidth error={props.error !== false} disabled={props.disabled} readOnly={props.readOnly}>
      <InputLabel>กลุ่มผู้ใช้</InputLabel>
      <Select onChange={props.onChange} value={props.value} name={props.name}>
          {userRoles.map((v, i) => (
            <MenuItem value={v.id} key={i}>{v.name}</MenuItem>
          ))}
      </Select>
      {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
      {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
    </FormControl>
  )
}

SelectUserRole.propTypes = {
    required: PropTypes.bool
  }
  
  SelectUserRole.defaultProps = {
    required: false,
    error: false,
    disabled: false,
    readOnly: false
  }

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

export default function RadioBoxIsActiveUser(props) {
  return (
    <FormControl fullWidth color='warning' focused>
      <FormLabel sx={{display: 'flex', justifyContent: 'flex-start', justifyItems: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start'}}>{props.label}</FormLabel>
        <RadioGroup value={props.value} name={props.name} onChange={props.onChange} row>
            <FormControlLabel value={true} label='เปิดใช้งาน' control={<Radio/>}></FormControlLabel>
            <FormControlLabel value={false} label='ปิดการใช้งาน' control={<Radio/>}></FormControlLabel>
        </RadioGroup>
    </FormControl>
  )
}


RadioBoxIsActiveUser.propTypes = {
  label: PropTypes.string
}

RadioBoxIsActiveUser.defaultProps = {
  label: 'สถานะผู้ใช้งาน'
}
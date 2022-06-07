import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, TextField } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

export default function CheckBoxGoodCategory(props) {
  return (
      <FormControl fullWidth error={props.error !== false}>
          <FormLabel sx={{display: 'flex', alignContent: 'start', color: 'black', mb: 2, height: 30, alignItems: 'center'}}>ประเภทสินค้า</FormLabel>
          <FormGroup>
              <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='1' checked={props.value[1]} onChange={props.onChange}></Checkbox>} label='หิน ดิน ทราย'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='2' checked={props.value[2]} onChange={props.onChange}></Checkbox>} label='วัสดุก่อสร้าง'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='3' checked={props.value[3]} onChange={props.onChange}></Checkbox>} label='ซีเมนต์'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='4' checked={props.value[4]} onChange={props.onChange}></Checkbox>} label='ข้าว'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='5' checked={props.value[5]} onChange={props.onChange}></Checkbox>} label='ผลิตภัณฑ์มันสำปะหลัง'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='6' checked={props.value[6]} onChange={props.onChange}></Checkbox>} label='ยางพารา'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='7' checked={props.value[7]} onChange={props.onChange}></Checkbox>} label='ผักสด/ผลไม้'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='8' checked={props.value[8]} onChange={props.onChange}></Checkbox>} label='อาหารแช่แข็ง'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='9' checked={props.value[9]} onChange={props.onChange}></Checkbox>} label='ผลิตภัณฑ์น้ำมันเชื้อเพลิง'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='10' checked={props.value[10]} onChange={props.onChange}></Checkbox>} label='สินค้าเบ็ดเตล็ด (โชวห่วย)'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='11' checked={props.value[11]} onChange={props.onChange}></Checkbox>} label='อ้อย'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='12' checked={props.value[12]} onChange={props.onChange}></Checkbox>} label='เคมีภัณฑ์'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='13' checked={props.value[13]} onChange={props.onChange}></Checkbox>} label='สินค้าอุตสาหกรรม (อุปกรณ์คอมพิวเตอร์)'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox name='14' checked={props.value[14]} onChange={props.onChange}></Checkbox>} label='สินค้าอื่นๆ'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6}>
                    {(props.required && !(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
                    {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <TextField name='0' value={props.value[0]} onChange={props.onChange} placeholder='โปรดระบุ' sx={{visibility: props.value[14] ? 'visible' : 'hidden'}}></TextField>
                  </Grid>
              </Grid>
          </FormGroup>
      </FormControl>
  )
}

CheckBoxGoodCategory.propTypes = {
  required: PropTypes.bool
}

CheckBoxGoodCategory.defaultProps = {
  required: false,
  error: false
}
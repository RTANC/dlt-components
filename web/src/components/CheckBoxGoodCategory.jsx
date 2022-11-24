import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, TextField, Stack, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

import '../styles/CheckBoxGoodCategory.css'

export default function CheckBoxGoodCategory(props) {
  return (
      <FormControl fullWidth error={props.error !== false}>
          <Typography variant="h5" sx={{fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 600, fontSize: 24, color: 'white', mt: 2, height: 30}}>ประเภทสินค้า</Typography>
          {/* <FormLabel sx={{display: 'flex', alignContent: 'start', fontFamily: 'Kanit', fontStyle: 'normal', fontWeight: 600, color: 'white', mb: 2, height: 40, alignItems: 'end', fontSize: 24 }} component="legend">ประเภทสินค้า</FormLabel> */}
          <FormGroup>
              <Grid container spacing={1} direction='row' wrap='wrap'>
                <Grid item xs={props.xs}>
                  <Stack spacing={2}>
                    <h4 className='goodCategoryGroup'>อาหาร และ ผลผลิตทางการเกษตร</h4>
                    <FormControlLabel control={<Checkbox name='5' checked={props.value[5]} onChange={props.onChange}></Checkbox>} label='ผลิตภัณฑ์มันสำปะหลัง'></FormControlLabel>
                    <FormControlLabel control={<Checkbox name='4' checked={props.value[4]} onChange={props.onChange}></Checkbox>} label='ข้าว'></FormControlLabel>
                    <FormControlLabel control={<Checkbox name='7' checked={props.value[7]} onChange={props.onChange}></Checkbox>} label='ผักสด/ผลไม้'></FormControlLabel>
                    <FormControlLabel control={<Checkbox name='11' checked={props.value[11]} onChange={props.onChange}></Checkbox>} label='อ้อย'></FormControlLabel>
                    <FormControlLabel control={<Checkbox name='6' checked={props.value[6]} onChange={props.onChange}></Checkbox>} label='ยางพารา'></FormControlLabel>
                    <FormControlLabel control={<Checkbox name='8' checked={props.value[8]} onChange={props.onChange}></Checkbox>} label='อาหารแช่แข็ง'></FormControlLabel>
                    <h4 className='goodCategoryGroup'>เคมีภัณฑ์</h4>
                    <FormControlLabel control={<Checkbox name='12' checked={props.value[12]} onChange={props.onChange}></Checkbox>} label='เคมีภัณฑ์'></FormControlLabel>
                    <FormControlLabel control={<Checkbox name='9' checked={props.value[9]} onChange={props.onChange}></Checkbox>} label='ผลิตภัณฑ์น้ำมันเชื้อเพลิง'></FormControlLabel>

                  </Stack>
                </Grid>
                <Grid item xs={props.xs}>
                  <Stack spacing={2}>
                    <h4 className='goodCategoryGroup'>อุปกรณ์ก่อสร้าง</h4>
                    <FormControlLabel control={<Checkbox name='1' checked={props.value[1]} onChange={props.onChange}></Checkbox>} label='หิน ดิน ทราย'></FormControlLabel>
                    <FormControlLabel control={<Checkbox name='3' checked={props.value[3]} onChange={props.onChange}></Checkbox>} label='ซีเมนต์'></FormControlLabel>
                    <FormControlLabel control={<Checkbox name='2' checked={props.value[2]} onChange={props.onChange}></Checkbox>} label='วัสดุก่อสร้าง'></FormControlLabel>
                    <h4 className='goodCategoryGroup'>อื่นๆ</h4>
                    <FormControlLabel control={<Checkbox name='10' checked={props.value[10]} onChange={props.onChange}></Checkbox>} label='สินค้าเบ็ดเตล็ด (โชวห่วย)'></FormControlLabel>
                    <FormControlLabel control={<Checkbox name='13' checked={props.value[13]} onChange={props.onChange}></Checkbox>} label='สินค้าอุตสาหกรรม (อุปกรณ์คอมพิวเตอร์)'></FormControlLabel>
                    <FormControlLabel control={<Checkbox name='14' checked={props.value[14]} onChange={props.onChange}></Checkbox>} label='สินค้าอื่นๆ'></FormControlLabel>
                    <TextField name='0' value={props.value[0]} onChange={props.onChange} placeholder='โปรดระบุ' disabled={props.value[14] ? false : true}></TextField>
                    {(!(props.error !== false)) && <FormHelperText>*จำเป็น</FormHelperText>}
                    {(props.error !== false) && <FormHelperText>{props.error}</FormHelperText>}
                  </Stack>
                </Grid>
              </Grid>
          </FormGroup>
      </FormControl>
  )
}

CheckBoxGoodCategory.propTypes = {
  required: PropTypes.bool,
  xs: PropTypes.number
}

CheckBoxGoodCategory.defaultProps = {
  required: false,
  error: false,
  xs: 6
}
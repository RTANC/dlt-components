import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@mui/material'
import React from 'react'

export default function CheckBoxGoodCategory(props) {
  return (
      <FormControl fullWidth>
          <FormLabel sx={{display: 'flex', alignContent: 'start', color: 'black', mb: 2, backgroundColor: '#eeeeee', height: 30, alignItems: 'center'}}>ประเภทสินค้า</FormLabel>
          <FormGroup>
              <Grid container spacing={2} direction='row' wrap='wrap'>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[1]} onChange={props.onChange}></Checkbox>} label='หิน ดิน ทราย'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[2]} onChange={props.onChange}></Checkbox>} label='วัสดุก่อสร้าง'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[3]} onChange={props.onChange}></Checkbox>} label='ซีเมนต์'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[4]} onChange={props.onChange}></Checkbox>} label='ข้าว'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[5]} onChange={props.onChange}></Checkbox>} label='ผลิตภัณฑ์มันสำปะหลัง'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[6]} onChange={props.onChange}></Checkbox>} label='ยางพารา'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[7]} onChange={props.onChange}></Checkbox>} label='ผักสด/ผลไม้'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[8]} onChange={props.onChange}></Checkbox>} label='อาหารแช่แข็ง'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[9]} onChange={props.onChange}></Checkbox>} label='ผลิตภัณฑ์น้ำมันเชื้อเพลิง'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[10]} onChange={props.onChange}></Checkbox>} label='สินค้าเบ็ดเตล็ด (โชวห่วย)'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[11]} onChange={props.onChange}></Checkbox>} label='อ้อย'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[12]} onChange={props.onChange}></Checkbox>} label='เคมีภัณฑ์'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[13]} onChange={props.onChange}></Checkbox>} label='สินค้าอุตสาหกรรม (อุปกรณ์คอมพิวเตอร์)'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                    <FormControlLabel control={<Checkbox checked={props.value[14]} onChange={props.onChange}></Checkbox>} label='สินค้าอื่นๆ'></FormControlLabel>
                  </Grid>
                  <Grid item xs={6}>
                  </Grid>
                  <Grid item xs={6} sx={{display: 'flex', alignContent: 'start'}}>
                      <TextField value={props.value[0]} onChange={props.onChange} placeholder='โปรดระบุ'></TextField>
                  </Grid>
              </Grid>
          </FormGroup>
      </FormControl>
  )
}

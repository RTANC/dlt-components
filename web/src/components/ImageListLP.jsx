import { Backdrop, Container, Grid, ImageList, ImageListItem } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'


export default function ImageListLP(props) {
  const [open, setOpen] = useState(false)
  const [imgFocus, setImgFocus] = useState('')
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = (img) => {
    setImgFocus(img)
    setOpen(true)
  }
  return (
    <React.Fragment>
      <Grid container spacing={1} direction='row' wrap='wrap'>
          {props.images.map((item, i) => (
            <Grid item xs={6} sm={6} md={3} key={i}>
              <img
              src={`${item}`}
              loading="lazy"
              onClick={() => handleOpen(`${item}`)}
              width="100%"
              height="auto"
              />
            </Grid>
          ))}
      </Grid>
    {/* <ImageList sx={{ width: '100%', height: 300 }} cols={4} rowHeight={164}>
      {props.images.map((item, i) => (
        <ImageListItem key={i}>
          <img
            src={`${item}`}
            loading="lazy"
            onClick={() => handleOpen(`${item}`)}
          />
        </ImageListItem>
      ))}
    </ImageList> */}
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
      <img
        src={imgFocus}
        loading="lazy"
        width='400'
        height='400'
      />
    </Backdrop>
    </React.Fragment>
  )
}

ImageListLP.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
}

ImageListLP.defaultProps = {
  images: ['./Image_Mock.png','./Image_Mock.png','./Image_Mock.png','./Image_Mock.png']
}

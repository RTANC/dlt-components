import { Backdrop, ImageList, ImageListItem } from '@mui/material'
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
    <ImageList sx={{ width: '100%', height: 300 }} cols={4} rowHeight={164}>
      {props.images.map((item, i) => (
        <ImageListItem key={i}>
          <img
            src={`${item}`}
            loading="lazy"
            onClick={() => handleOpen(`${item}`)}
          />
        </ImageListItem>
      ))}
    </ImageList>
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
  images: ['/static/Image_Mock.png','/static/Image_Mock.png','/static/Image_Mock.png','/static/Image_Mock.png']
}

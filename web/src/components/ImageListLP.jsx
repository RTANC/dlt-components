import { Backdrop, ImageList, ImageListItem } from '@mui/material'
import React from 'react'
import { useState } from 'react'

export default function ImageListLP() {
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
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            onClick={() => handleOpen(`${item.img}?w=164&h=164&fit=crop&auto=format`)}
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

const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    }
  ]

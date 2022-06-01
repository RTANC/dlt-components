import { Container, Grid, Slide } from '@mui/material'
import React from 'react'

export default function Query() {
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
    <Container maxWidth="false">
      <Grid
        container
        spacing={1}
        direction="row"
        wrap="wrap"
      >
        <Grid item md={4} lg={3}>Hello 1</Grid>
        <Grid item md={4} lg={3}>Hello 2</Grid>
        <Grid item md={4} lg={3}>Hello 3</Grid>
        <Grid item md={4} lg={3}>Hello 4</Grid>
        <Grid item md={4} lg={3}>Hello 5</Grid>
        <Grid item md={4} lg={3}>Hello 6</Grid>
        <Grid item md={4} lg={3}>Hello 7</Grid>
        <Grid item md={4} lg={3}>Hello 8</Grid>
        <Grid item md={4} lg={3}>Hello 9</Grid>
      </Grid>
    </Container>
    </Slide>
  )
}

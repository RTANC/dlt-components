import './App.css';
import SelectStation from './components/SelectStation';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import React, { useState } from 'react'

function App() {
  const [station, setStation] = useState('')
    const handleSelectStation = (e) => {
      setStation(e.target.value)
    }
  return (
    <div className="App">
      <Container maxWidth={false}>
        <Grid
          container
          spacing={2}
          direction="row"
          wrap="wrap"
          
        >
          <Grid item xs={12}>

</Grid>
          <Grid item xs={4}>
            <SelectStation onChange={handleSelectStation} value={station}></SelectStation>
          </Grid>
          <Grid item xs={12}>
            <p>{station}</p>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;

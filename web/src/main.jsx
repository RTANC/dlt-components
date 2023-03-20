import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './redux/store'
import { Provider} from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import StyledEngineProvider from "@mui/material/StyledEngineProvider"
// import moment from 'moment-timezone'
// moment.tz.setDefault('UTC')
// moment.tz.setDefault('Asia/Bangkok')

import './styles/Global.css'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#bdbdbd',
      contrastText: '#000000',
      dark: '#ffffff',
      light: '#000000'
    },
    appBar: {
      main: 'rgba(0, 0, 0, 0.5);',
      contrastText: '#ffffff',
      dark: '#ffffff',
      light: '#000000'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

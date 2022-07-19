import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './redux/store'
import { Provider} from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import moment from 'moment-timezone'
// moment.tz.setDefault('UTC')

const theme = createTheme({
  palette: {
    secondary: {
      main: '#fafafa'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

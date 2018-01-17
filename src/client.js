import React from 'react'
import {render} from 'react-dom'
import 'whatwg-fetch'
import {jss, ThemeProvider, JssProvider} from './utils/jss'
import theme from './theme'
import App from './components/App'

render(
  <ThemeProvider theme={theme}>
    <JssProvider jss={jss}>
      <App />
    </JssProvider>
  </ThemeProvider>,
  document.getElementById('app')
)

const style = document.getElementById('critical-css')
style.parentNode.removeChild(style)

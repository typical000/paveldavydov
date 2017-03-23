import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import 'whatwg-fetch'

import App from './components/app'

render(
  <App />,
  document.body
)

const style = document.getElementById('critical-css')
style.parentNode.removeChild(style)

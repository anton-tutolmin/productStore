import React from 'react'
import { render } from 'react-dom'

import { App } from './App/index.jsx'

render(
  <div>
    <App />
    Hello world
  </div>,
  document.getElementById('app')
);
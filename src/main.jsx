import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Base styles FIRST. Importing them after App puts globals last in the bundle,
// where `.ed{color:navy}` silently beat every component's white heading — the
// hero headline was rendering navy-on-navy and reading as blank space.
import './style/globals.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

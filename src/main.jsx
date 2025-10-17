import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'  // Changed to HashRouter
import App from './components/App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>  {/* GitHub Pages compatible */}
      <App />
    </HashRouter>
  </React.StrictMode>,
)

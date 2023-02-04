import React, { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthContextTokin from './Components/AuthContextTokin/AuthContextTokin'


ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <AuthContextTokin>
      <BrowserRouter>
       <App />
      </BrowserRouter>
    </AuthContextTokin>
  </div>,
)

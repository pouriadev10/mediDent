import React from 'react'
import ReactDOM from 'react-dom'
import './app.global.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Elements, StripeProvider } from 'react-stripe-elements';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

  , document.getElementById('root'))
serviceWorker.unregister()

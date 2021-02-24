import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app'
import { store } from './store'
import { Provider } from 'react-redux'
import { stayAuth } from './services/home'

store.dispatch(stayAuth)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)

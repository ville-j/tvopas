import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import axios from 'axios'
import { onSnapshot, applySnapshot } from 'mobx-state-tree'
import { AppStore } from './stores/AppStore'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const store = AppStore.create(
  {},
  {
    API: API,
  }
)

const snapshot = localStorage.getItem('state')
if (snapshot) {
  applySnapshot(store, JSON.parse(snapshot))
}

onSnapshot(store, snapshot => {
  localStorage.setItem('state', JSON.stringify(snapshot))
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

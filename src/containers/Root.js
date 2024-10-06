import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import Routes from '../Routes'
import { controller } from '../Login/controller'
import LoginPage from '../Login/LoginPage'
export default class Root extends Component {

  render() {
    const { store, history } = this.props
    return (

          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>
          </Provider>

    )
  }
}

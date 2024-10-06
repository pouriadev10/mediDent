import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { authentication } from './authentication'
import { dashboard } from './dashboard'
import { paymentRequest } from './paymentRequest'
import { providers } from './providers'

export default function createRootReducer (history: {}) {
  const routerReducer = connectRouter(history)

  return connectRouter(history)(
    combineReducers({
      router: routerReducer,
      authentication,
      dashboard,
      paymentRequest,
	  providers
    })
  )
}

import { apiService } from '../_services'
import { history } from '../_helpers/history';
import { push } from 'react-router-redux'

export const paymentRequestConstants = {
  CREATE_BEGIN: 'CREATE_PAYMENT_REQUEST_BEGIN',
  CREATE_SUCCESS: 'CREATE_PAYMENT_REQUEST_SUCCESS',
  CREATE_FAILURE: 'CREATE_PAYMENT_REQUEST_FAILURE',

  GET_BEGIN: 'GET_PAYMENT_REQUEST_BEGIN',
  GET_SUCCESS: 'GET_PAYMENT_REQUEST_SUCCESS',
  GET_FAILURE: 'GET_PAYMENT_REQUEST_FAILURE',
};

export const paymentRequestActions = {
  create,
  get
};

function create (data) {
  const begin = () => ({type: paymentRequestConstants.CREATE_BEGIN})
  const success = summary => ({type: paymentRequestConstants.CREATE_SUCCESS, summary})
  const failure = error => ({type: paymentRequestConstants.CREATE_FAILURE, error})
  return dispatch => {
    dispatch(begin())
    apiService.create_payment('/billpay/paymentrequest/', data)
      .then(data => {
        dispatch(success(data))
        dispatch(push(`/dashboard`))
      })
      .catch(error => {
        dispatch(failure(error))
      })
  }
}


function get (uuid) {
  const begin = () => ({type: paymentRequestConstants.GET_BEGIN})
  const success = paymentRequest => ({type: paymentRequestConstants.GET_SUCCESS, paymentRequest})
  const failure = error => ({type: paymentRequestConstants.GET_FAILURE, error})

  return dispatch => {
    dispatch(begin())
    apiService.post(`/billpay/payment/{uuid}`)
      .then(data => {
        dispatch(success(data))
      })
      .catch(error => {
        dispatch(failure(error))
      })
  }
}
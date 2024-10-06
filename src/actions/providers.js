import { apiService } from '../_services'
import { history } from '../_helpers/history';
import { push } from 'react-router-redux'

export const providersConstants = {
  CREATE_BEGIN:   'CREATE_PROVIDER_BEGIN',
  CREATE_SUCCESS: 'CREATE_PROVIDER_SUCCESS',
  CREATE_FAILURE: 'CREATE_PROVIDER_FAILURE',

  GET_BEGIN:   'GET_PROVIDER_BEGIN',
  GET_SUCCESS: 'GET_PROVIDER_SUCCESS',
  GET_FAILURE: 'GET_PROVIDER_FAILURE',
};

export const providersActions = {
  create,
  get
};

function create (data) {
  const begin = () => ({type: providersConstants.CREATE_BEGIN})
  const success = summary => ({type: providersConstants.CREATE_SUCCESS, summary})
  const failure = error => ({type: providersConstants.CREATE_FAILURE, error})
  
  return dispatch => {
    dispatch(begin())
    apiService.create_payment('/clinics/providers/', data)
      .then(data => {
        dispatch(success(data))
        dispatch(push(`/dashboard`))
      })
      .catch(error => {
        dispatch(failure(error))
      })
  }
}


function get (id) {
  const begin = () => ({type: providersConstants.GET_BEGIN})
  const success = providerData => ({type: providersConstants.GET_SUCCESS, providerData})
  const failure = error => ({type: providersConstants.GET_FAILURE, error})

  return dispatch => {
    dispatch(begin())
    apiService.post(`/clinics/providers/{id}`)
      .then(data => {
        dispatch(success(data))
      })
      .catch(error => {
        dispatch(failure(error))
      })
  }
}
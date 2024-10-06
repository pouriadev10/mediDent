import { apiService } from '../_services';

export const dashboardConstants = {
  FETCH_SUMMARY_BEGIN: 'FETCH_DASHBOARD_SUMMARY_BEGIN',
  FETCH_SUMMARY_SUCCESS: 'FETCH_DASHBOARD_SUMMARY_SUCCESS',
  FETCH_SUMMARY_FAILURE: 'FETCH_DASHBOARD_SUMMARY_FAILURE',

  FETCH_PROFILE_SUMMARY_BEGIN: 'FETCH_DASHBOARD_PROFILE_SUMMARY_BEGIN',
  FETCH_PROFILE_SUMMARY_SUCCESS: 'FETCH_DASHBOARD_PROFILE_SUMMARY_SUCCESS',
  FETCH_PROFILE_SUMMARY_FAILURE: 'FETCH_DASHBOARD_PROFILE_SUMMARY_FAILURE',

  FETCH_PAYMENT_REQUESTS_BEGIN: 'FETCH_DASHBOARD_PAYMENT_REQUESTS_BEGIN',
  FETCH_PAYMENT_REQUESTS_SUCCESS: 'FETCH_DASHBOARD_PAYMENT_REQUESTS_SUCCESS',
  FETCH_PAYMENT_REQUESTS_FAILURE: 'FETCH_DASHBOARD_PAYMENT_REQUESTS_FAILURE'
};

export const dashboardActions = {
  fetchSummary,
  fetchPaymentRequests,
  fetchProfileSummary
};

function fetchSummary() {
  const begin = () => ({ type: dashboardConstants.FETCH_SUMMARY_BEGIN })
  const success = summary => ({ type: dashboardConstants.FETCH_SUMMARY_SUCCESS, summary })
  const failure = error => ({ type: dashboardConstants.FETCH_SUMMARY_FAILURE, error })

  return dispatch => {
    dispatch(begin())
    apiService.get('/dj-rest-auth/user/')
      .then(data => {
        dispatch(success(data))
      })
      .catch(error => {
        dispatch(failure(error))
      })
  }
}

function fetchProfileSummary() {
  const begin = () => ({ type: dashboardConstants.FETCH_PROFILE_SUMMARY_BEGIN })
  const success = profileSummary => ({ type: dashboardConstants.FETCH_PROFILE_SUMMARY_SUCCESS, profileSummary })
  const failure = error => ({ type: dashboardConstants.FETCH_PROFILE_SUMMARY_FAILURE, error })

  return dispatch => {
    dispatch(begin())
    apiService.getOfficeData('/clinics/dashboardsummary/', localStorage.getItem("selectedOffice"))
      .then(data => {
        dispatch(success(data))
      })
      .catch(error => {
        dispatch(failure(error))
      })
  }
}

function fetchPaymentRequests(page_size, page, search_term) {
  const begin = () => ({ type: dashboardConstants.FETCH_PAYMENT_REQUESTS_BEGIN })
  const success = requests => ({ type: dashboardConstants.FETCH_PAYMENT_REQUESTS_SUCCESS, requests })
  const failure = error => ({ type: dashboardConstants.FETCH_PAYMENT_REQUESTS_FAILURE, error })

  return dispatch => {
    dispatch(begin())
    apiService.get(`/billpay/paymentrequests/?page=${page}&page_size=${page_size}&search=${search_term}&office=${localStorage.getItem("selectedOffice")}`)
      .then(data => {
        dispatch(success(data))
      })
      .catch(error => {
        dispatch(failure(error))
      })
  }
}
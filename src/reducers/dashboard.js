
import { dashboardConstants } from '../actions/dashboard';


const initialState = {};

export function dashboard(state = initialState, action) {
  switch (action.type) {
    case dashboardConstants.FETCH_SUMMARY_BEGIN:
      return {
        ...state,
        error:null,
        loadingSummary: true
      };
    case dashboardConstants.FETCH_SUMMARY_SUCCESS:
      return {
        ...state,
        error:null,
        loadingSummary: false,
        summary: action.summary
      };
    case dashboardConstants.FETCH_SUMMARY_FAILURE:
      return {
        error: action.error
      };
    case dashboardConstants.FETCH_PROFILE_SUMMARY_BEGIN:
      return {
        ...state,
        error:null,
        loadingSummary: true
      };
    case dashboardConstants.FETCH_PROFILE_SUMMARY_SUCCESS:
      return {
        ...state,
        error:null,
        loadingSummary: false,
        profileSummary: action.profileSummary
      };
    case dashboardConstants.FETCH_PROFILE_SUMMARY_FAILURE:
      return {
        error: action.error
      };
    case dashboardConstants.FETCH_PAYMENT_REQUESTS_BEGIN:
      return {
        ...state,
        error:null,
        loadingRequests : true
      };
    case dashboardConstants.FETCH_PAYMENT_REQUESTS_SUCCESS:
      return {
        ...state,
        error:null,
        loadingRequests: false,
        requests: action.requests
      };
    case dashboardConstants.FETCH_PAYMENT_REQUESTS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
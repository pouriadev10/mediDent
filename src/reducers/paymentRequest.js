
import { paymentRequestConstants } from '../actions/paymentRequest';


const initialState = {};

export function paymentRequest(state = initialState, action) {
  switch (action.type) {
    case paymentRequestConstants.CREATE_BEGIN:
      return {
        creating: true
      };
    case paymentRequestConstants.CREATE_SUCCESS:
      return {
        paymentRequest: action.paymentRequest
      };
    case paymentRequestConstants.CREATE_FAILURE:
      return {
        error: action.error
      };
    case paymentRequestConstants.GET_BEGIN:
      return {
        getting: true
      };
    case paymentRequestConstants.GET_SUCCESS:
      return {
        paymentRequest: action.paymentRequest
      };
    case paymentRequestConstants.GET_FAILURE:
      return {
        error: action.error
      };

    default:
      return state
  }
}
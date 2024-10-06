
import { providersConstants } from '../actions/providers';


const initialState = {};

export function providers(state = initialState, action) {
  switch (action.type) {
    case providersConstants.CREATE_BEGIN:
      return {
        creating: true
      };
    case providersConstants.CREATE_SUCCESS:
      return {};
    case providersConstants.CREATE_FAILURE:
      return {
        error: action.error
      };
    case providersConstants.GET_BEGIN:
      return {
        getting: true
      };
    case providersConstants.GET_SUCCESS:
      return {
        providerData: action.providerData
      };
    case providersConstants.GET_FAILURE:
      return {
        error: action.error
      };

    default:
      return state
  }
}
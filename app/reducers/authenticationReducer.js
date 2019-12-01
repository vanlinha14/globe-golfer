import { 
  LOGIN_BEGIN, 
  LOGIN_FINISH, 
  LOGIN_ERROR,
  REGISTER_BEGIN,
  REGISTER_FINISH,
  REGISTER_ERROR
} from '../actions/types'
import Api from '../api';

const initialState = {
  isLoading: false,
  accessToken: null,
  error: null,
}

export default authenticationReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_BEGIN:
      return {
        isLoading: true,
        accessToken: null,
        error: null
      }
    case REGISTER_BEGIN: 
      return {
        isLoading: true,
        accessToken: null,
        error: null
      }
    case LOGIN_FINISH:
      const accessToken = action.payload.accessToken
      Api.instance().setAccessToken(accessToken)
      return {
        isLoading: false,
        error: null,
        accessToken
      }
    case REGISTER_FINISH: {
      const accessToken = action.payload.accessToken
      Api.instance().setAccessToken(accessToken)
      return {
        isLoading: false,
        error: null,
        accessToken: accessToken
      }
    }
    case LOGIN_ERROR:
      return {
        isLoading: false,
        accessToken: null,
        error: action.payload
      }
    case REGISTER_ERROR:
      return {
        isLoading: false,
        accessToken: null,
        error: action.payload
      }
    default:
      return state
  }
}
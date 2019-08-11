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
  accessToken: null
}

export default authenticationReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_BEGIN:
      return {
        isLoading: true,
        accessToken: null
      }
    case REGISTER_BEGIN: 
      return {
        isLoading: true,
        accessToken: null
      }
    case LOGIN_FINISH:
      const accessToken = action.payload.accessToken
      Api.instance().setAccessToken(accessToken)
      return {
        isLoading: false,
        accessToken
      }
    case REGISTER_FINISH: {
      const accessToken = action.payload.accessToken
      Api.instance().setAccessToken(accessToken)
      return {
        isLoading: false,
        accessToken: accessToken
      }
    }
    case LOGIN_ERROR:
      return {
        isLoading: false,
        accessToken: null
      }
    case REGISTER_ERROR:
      return {
        isLoading: false,
        accessToken: null
      }
    default:
      return state
  }
}
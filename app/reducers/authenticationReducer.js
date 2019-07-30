import { 
  LOGIN_BEGIN, 
  LOGIN_FINISH, 
  LOGIN_ERROR,
  REGISTER_BEGIN,
  REGISTER_FINISH,
  REGISTER_ERROR
} from '../actions/types'

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
      return {
        isLoading: false,
        accessToken: action.payload.accessToken
      }
    case REGISTER_FINISH: 
      return {
        isLoading: false,
        accessToken: action.payload.accessToken
      }
    case LOGIN_ERROR:
      return {
        isLoading: false,
        accessToken: null
      }
    default:
      return state
  }
}
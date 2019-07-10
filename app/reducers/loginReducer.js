import { LOGIN_BEGIN, LOGIN_FINISH, LOGIN_ERROR } from '../actions/types'

const initialState = {
  isLoading: false,
  accessToken: null
}

export default loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_BEGIN:
      return {
        isLoading: true,
        accessToken: null
      }
    case LOGIN_FINISH: 
      return {
        isLoading: false,
        accessToken: action.payload.accessToken
      }
    default:
      return state
  }
}
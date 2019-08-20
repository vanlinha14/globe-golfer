import { GET_PROFILE } from '../actions/types'

const initialState = {
  isLoading: false,
  user: null,
  settings: null
}

export default profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PROFILE.BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case GET_PROFILE.FINISH:
      if (action.payload.result) {
        return {
          isLoading: false,
          user: action.payload.user,
          settings: action.payload.settings
        }
      }
      else {
        return {
          isLoading: false,
          user: null,
          settings: null
        }
      }
      
    default:
      return state
  }
}
import { 
  GET_MESSAGES
} from '../actions/types'

const initialState = {
  isLoading: false,
  data: null
}

export default matchesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_MESSAGES.BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case GET_MESSAGES.FINISH:
      return {
        isLoading: false,
        data: action.payload
      }
    default:
      return state
  }
}
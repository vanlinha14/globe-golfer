import { 
  GET_NOTIFICATIONS
} from '../actions/types'

const initialState = {
  new: {
    isLoading: false,
    data: null  
  },
  history: {
    isLoading: false,
    data: null  
  }
}

export default matchesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_NOTIFICATIONS.NEW.BEGIN:
      return {
        ...state,
        new: {
          ...state.new,
          isLoading: true  
        }
      }
    case GET_NOTIFICATIONS.HISTORY.BEGIN:
      return {
        ...state,
        history: {
          ...state.history,
          isLoading: true  
        }
      }
    case GET_NOTIFICATIONS.NEW.FINISH:
      return {
        ...state,
        new: {
          isLoading: false,
          data: action.payload
        }
      }
    case GET_NOTIFICATIONS.HISTORY.FINISH:
      return {
        ...state,
        history: {
          isLoading: false,
          data: action.payload
        }
      }
    default:
      return state
  }
}
import { 
  GET_PENDING_MATCHES_BEGIN, 
  GET_PENDING_MATCHES_FINISH, 
  GET_PLAYED_MATCHES_BEGIN,
  GET_PLAYED_MATCHES_FINISH 
} from '../actions/types'

const initialState = {
  played: {
    isLoading: false,
    data: null  
  },
  pending: {
    isLoading: false,
    data: null  
  }
}

export default matchesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PENDING_MATCHES_BEGIN:
      return {
        ...state,
        pending: {
          ...state.pending,
          isLoading: true  
        }
      }
    case GET_PLAYED_MATCHES_BEGIN:
      return {
        ...state,
        played: {
          ...state.played,
          isLoading: true  
        }
      }
    case GET_PENDING_MATCHES_FINISH:
      return {
        ...state,
        pending: {
          isLoading: false,
          data: action.payload
        }
      }
    case GET_PLAYED_MATCHES_FINISH:
      return {
        ...state,
        played: {
          isLoading: false,
          data: action.payload
        }
      }
    default:
      return state
  }
}
import { GET_INTEREST } from '../actions/types'

const initialState = {
  isLoading: false,
  interests: null
}

export default interestReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INTEREST.BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case GET_INTEREST.FINISH:
      return {
        isLoading: false,
        interests: action.payload
      }
    default:
      return state
  }
}
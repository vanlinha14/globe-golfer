import { GET_CLUBS_BEGIN, GET_CLUBS_FINISH, GET_CLUBS_ERROR } from '../actions/types'

const initialState = {
  isLoading: false,
  data: null
}

export default clubsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CLUBS_BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case GET_CLUBS_FINISH:
      return {
        isLoading: false,
        data: action.payload
      }
    default:
      return state
  }
}
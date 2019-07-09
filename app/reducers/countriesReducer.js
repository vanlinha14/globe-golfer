import { GET_COUNTRIES_BEGIN, GET_COUNTRIES_FINISH, GET_COUNTRIES_ERROR } from '../actions/types'

const initialState = {
  isLoading: false,
  data: null
}

export default countriesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_COUNTRIES_BEGIN:
      return {
        isLoading: true,
        data: state.data
      }
    case GET_COUNTRIES_FINISH:
      return {
        isLoading: false,
        data: action.payload
      }
    default:
      return state
  }
}
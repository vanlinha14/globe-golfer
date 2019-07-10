import { GET_REGIONS_BEGIN, GET_REGIONS_FINISH, GET_REGIONS_ERROR } from '../actions/types'

const initialState = {
  isLoading: false,
  data: null
}

export default regionsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_REGIONS_BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case GET_REGIONS_FINISH: 
      return {
        isLoading: false,
        data: action.payload
      }
    default:
      return state
  }
}
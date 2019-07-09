import { GET_REGIONS_BEGIN, GET_REGIONS_FINISH, GET_REGIONS_ERROR } from '../actions/types'

const initialState = {
  regions: {
    isLoading: false,
    data: null
  }
}

export default regionsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_REGIONS_BEGIN:
      return {
        ...state,
        regions: {
          isLoading: true,
          data: state.regions.data
        }
      }
    case GET_REGIONS_FINISH: 
      return {
        ...state,
        regions: {
          isLoading: false,
          data: action.payload
        }
      }
    default:
      return state
  }
}
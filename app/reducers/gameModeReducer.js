import { GET_GAME_MODE } from '../actions/types'

const initialState = {
  isLoading: false,
  data: null
}

export default gameModeReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_GAME_MODE.BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case GET_GAME_MODE.FINISH: 
      return {
        isLoading: false,
        data: action.payload
      }
    case GET_GAME_MODE.ERROR: 
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
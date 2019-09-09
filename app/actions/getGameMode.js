import { GET_GAME_MODE } from './types'
import Api from '../api'

export const getGameModeBegin = () => {
  return {
    type: GET_GAME_MODE.BEGIN
  }
}

export const getGameModeFinish = modes => {
  return {
    type: GET_GAME_MODE.FINISH,
    payload: modes
  }
}

export const getGameModeError = error => {
  return {
    type: GET_GAME_MODE.ERROR,
    payload: error
  }
}

export function getGameMode() {
  return function (dispatch) {
    dispatch(getGameModeBegin())
    return Api.instance()
      .getGameMode()
      .then(modes => dispatch(getGameModeFinish(modes)))
      .catch(error => dispatch(getGameModeError(error)))
  }
}
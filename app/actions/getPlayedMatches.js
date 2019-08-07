import { 
  GET_PLAYED_MATCHES_BEGIN, 
  GET_PLAYED_MATCHES_FINISH,
  GET_PLAYED_MATCHES_ERROR 
} from './types'
import Api from '../api'

export const getPlayedMatchesBegin = () => {
  return {
    type: GET_PLAYED_MATCHES_BEGIN
  }
}

export const getPlayedMatchesFinish = matches => {
  return {
    type: GET_PLAYED_MATCHES_FINISH,
    payload: matches
  }
}

export const getPlayedMatchesError = error => {
  return {
    type: GET_PLAYED_MATCHES_ERROR,
    payload: error
  }
}

export function getPlayedMatches() {
  return function (dispatch) {
    dispatch(getPlayedMatchesBegin())
    return Api.instance()
      .getPlayedMatches()
      .then(matches => dispatch(getPlayedMatchesFinish(matches)))
      .catch(error => dispatch(getPlayedMatchesError(error)))
  }
}
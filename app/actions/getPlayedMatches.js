import { GET_PLAYED_MATCHES } from './types'
import Api from '../api'

export const getPlayedMatchesBegin = () => {
  return {
    type: GET_PLAYED_MATCHES.BEGIN
  }
}

export const getPlayedMatchesFinish = matches => {
  return {
    type: GET_PLAYED_MATCHES.FINISH,
    payload: matches
  }
}

export const getPlayedMatchesError = error => {
  return {
    type: GET_PLAYED_MATCHES.ERROR,
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
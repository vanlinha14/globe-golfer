import { GET_PENDING_MATCHES } from './types'
import Api from '../api'

export const getPendingMatchesBegin = () => {
  return {
    type: GET_PENDING_MATCHES.BEGIN
  }
}

export const getPendingMatchesFinish = matches => {
  return {
    type: GET_PENDING_MATCHES.FINISH,
    payload: matches
  }
}

export const getPendingMatchesError = error => {
  return {
    type: GET_PENDING_MATCHES.ERROR,
    payload: error
  }
}

export function getPendingMatches() {
  return function (dispatch) {
    dispatch(getPendingMatchesBegin())
    return Api.instance()
      .getPendingMatches()
      .then(matches => dispatch(getPendingMatchesFinish(matches)))
      .catch(error => dispatch(getPendingMatchesError(error)))
  }
}
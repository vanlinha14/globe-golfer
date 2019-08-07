import { 
  GET_PENDING_MATCHES_BEGIN, 
  GET_PENDING_MATCHES_FINISH, 
  GET_PENDING_MATCHES_ERROR 
} from './types'
import Api from '../api'

export const getPendingMatchesBegin = () => {
  return {
    type: GET_PENDING_MATCHES_BEGIN
  }
}

export const getPendingMatchesFinish = matches => {
  return {
    type: GET_PENDING_MATCHES_FINISH,
    payload: matches
  }
}

export const getPendingMatchesError = error => {
  return {
    type: GET_PENDING_MATCHES_ERROR,
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
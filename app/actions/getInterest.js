import { GET_INTEREST } from './types'
import Api from '../api'

export const getInterestBegin = () => {
  return {
    type: GET_INTEREST.BEGIN
  }
}

export const getInterestFinish = interests => {
  return {
    type: GET_INTEREST.FINISH,
    payload: interests
  }
}

export const getInterestError = error => {
  return {
    type: GET_INTEREST.ERROR,
    payload: error
  }
}

export function getInterests() {
  return function (dispatch) {
    dispatch(getInterestBegin())
    return Api.instance()
      .getInterest()
      .then(interests => dispatch(getInterestFinish(interests)))
      .catch(error => dispatch(getInterestError(error)))
  }
}
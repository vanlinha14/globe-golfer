import { GET_PROFILE } from './types'
import Api from '../api'

export const getProfileBegin = () => {
  return {
    type: GET_PROFILE.BEGIN
  }
}

export const getProfileFinish = profile => {
  return {
    type: GET_PROFILE.FINISH,
    payload: profile
  }
}

export const getProfileError = error => {
  return {
    type: GET_PROFILE.ERROR,
    payload: error
  }
}

export function getProfile() {
  return function (dispatch) {
    dispatch(getProfileBegin())
    return Api.instance()
      .getProfile()
      .then(profile => dispatch(getProfileFinish(profile)))
      .catch(error => dispatch(getProfileError(error)))
  }
}
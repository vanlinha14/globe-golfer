import { UPDATE_PROFILE } from './types'
import Api from '../api'

export const updateProfileBegin = () => {
  return {
    type: UPDATE_PROFILE.BEGIN
  }
}

export const updateProfileFinish = profile => {
  return {
    type: UPDATE_PROFILE.FINISH,
    payload: profile
  }
}

export const updateProfileError = error => {
  return {
    type: UPDATE_PROFILE.ERROR,
    payload: error
  }
}

export function updateProfile(objToUpdate) {
  return function (dispatch) {
    dispatch(updateProfileBegin())
    return Api.instance()
      .updateProfile(objToUpdate)
      .then(profile => dispatch(updateProfileFinish(profile)))
      .catch(error => dispatch(updateProfileError(error)))
  }
}
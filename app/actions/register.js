import { REGISTER_BEGIN, REGISTER_FINISH, REGISTER_ERROR } from './types'
import Api from '../api'

export const registerBegin = () => {
  return {
    type: REGISTER_BEGIN
  }
}

export const registerFinish = authenData => {
  return {
    type: REGISTER_FINISH,
    payload: authenData
  }
}

export const registerError = error => {
  return {
    type: REGISTER_ERROR,
    payload: error
  }
}

export function register() {
  return function (dispatch) {
    dispatch(registerBegin())
    return Api.instance()
      .register()
      .then(authenData => dispatch(registerFinish(authenData)))
      .catch(error => dispatch(registerError(error)))
  }
}
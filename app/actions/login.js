import { LOGIN_BEGIN, LOGIN_FINISH, LOGIN_ERROR } from './types'
import Api from '../api'

export const loginBegin = () => {
  return {
    type: LOGIN_BEGIN
  }
}

export const loginFinish = authenData => {
  return {
    type: LOGIN_FINISH,
    payload: authenData
  }
}

export const loginError = error => {
  return {
    type: LOGIN_ERROR,
    payload: error
  }
}

export function loginWithEmail(email, password) {
  return function (dispatch) {
    dispatch(loginBegin())
    return Api.instance()
      .login(email, password)
      .then(authenData => dispatch(loginFinish(authenData)))
      .catch(error => dispatch(loginError(error)))
  }
}

export function liginWithGoogle(userInfo) {
  return function (dispatch) {
    dispatch(loginBegin())
    return Api.instance()
      .loginGoogle(userInfo)
      .then(authenData => dispatch(loginFinish(authenData)))
      .catch(error => dispatch(loginError(error)))
  }
}

export function liginWithFacebook(userInfo) {
  return function (dispatch) {
    dispatch(loginBegin())
    return Api.instance()
      .loginFacebook(userInfo)
      .then(authenData => dispatch(loginFinish(authenData)))
      .catch(error => dispatch(loginError(error)))
  }
}
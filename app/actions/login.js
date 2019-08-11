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
      .then(authenData => {
        if (authenData.result === true) {
          dispatch(loginFinish(authenData))
        }
        else {
          dispatch(loginError("error just fail"))
        }
      })
      .catch(error => dispatch(loginError(error)))
  }
}

export function loginWithGoogle(id, token) {
  return function (dispatch) {
    dispatch(loginBegin())
    return Api.instance()
      .loginGoogle(id, token)
      .then(authenData => dispatch(loginFinish(authenData)))
      .catch(error => dispatch(loginError(error)))
  }
}

export function loginWithFacebook(id, token) {
  return function (dispatch) {
    dispatch(loginBegin())
    return Api.instance()
      .loginFacebook(id, token)
      .then(authenData => dispatch(loginFinish(authenData)))
      .catch(error => dispatch(loginError(error)))
  }
}
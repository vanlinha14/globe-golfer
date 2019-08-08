import { GET_MESSAGES } from './types'
import Api from '../api'

export const getMessagesBegin = () => {
  return {
    type: GET_MESSAGES.BEGIN
  }
}

export const getMessagesFinish = matches => {
  return {
    type: GET_MESSAGES.FINISH,
    payload: matches
  }
}

export const getMessagesError = error => {
  return {
    type: GET_MESSAGES.ERROR,
    payload: error
  }
}

export function getMessages(tag) {
  return function (dispatch) {
    dispatch(getMessagesBegin())
    return Api.instance()
      .getMessages(tag)
      .then(messages => dispatch(getMessagesFinish(messages)))
      .catch(error => dispatch(getMessagesError(error)))
  }
}
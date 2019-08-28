import { GET_NOTIFICATIONS } from './types'
import Api from '../api'

export const getNewNotificationsBegin = () => {
  return {
    type: GET_NOTIFICATIONS.NEW.BEGIN
  }
}

export const getNewNotificationsFinish = notifications => {
  return {
    type: GET_NOTIFICATIONS.NEW.FINISH,
    payload: notifications
  }
}

export const getNewNotificationsError = error => {
  return {
    type: GET_NOTIFICATIONS.NEW.ERROR,
    payload: error
  }
}

export const getHistoryNotificationsBegin = () => {
  return {
    type: GET_NOTIFICATIONS.HISTORY.BEGIN
  }
}

export const getHistoryNotificationsFinish = notifications => {
  return {
    type: GET_NOTIFICATIONS.HISTORY.FINISH,
    payload: notifications
  }
}

export const getHistoryNotificationsError = error => {
  return {
    type: GET_NOTIFICATIONS.HISTORY.ERROR,
    payload: error
  }
}

export function getNewNotifications(tag) {
  return function (dispatch) {
    dispatch(getNewNotificationsBegin())
    return Api.instance()
      .getNewNotifications(tag)
      .then(notifications => dispatch(getNewNotificationsFinish(notifications)))
      .catch(error => dispatch(getNewNotificationsError(error)))
  }
}

export function getHistoryNotifications(tag) {
  return function (dispatch) {
    dispatch(getHistoryNotificationsBegin())
    return Api.instance()
      .getHistoryNotifications(tag)
      .then(notifications => dispatch(getHistoryNotificationsFinish(notifications)))
      .catch(error => dispatch(getHistoryNotificationsError(error)))
  }
}
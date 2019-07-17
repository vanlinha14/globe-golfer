import { GET_CLUBS_BEGIN, GET_CLUBS_FINISH, GET_CLUBS_ERROR } from './types'
import Api from '../api'

export const getClubsBegin = () => {
  return {
    type: GET_CLUBS_BEGIN
  }
}

export const getClubsFinish = clubs => {
  return {
    type: GET_CLUBS_FINISH,
    payload: clubs
  }
}

export const getClubsError = error => {
  return {
    type: GET_CLUBS_ERROR,
    payload: error
  }
}

export function getClubs(regionId) {
  return function (dispatch) {
    dispatch(getClubsBegin())
    return Api.instance()
      .getClubs(regionId)
      .then(clubs => dispatch(getClubsFinish(clubs)))
      .catch(error => dispatch(getClubsError(error)))
  }
}
import { GET_REGIONS_BEGIN, GET_REGIONS_FINISH, GET_REGIONS_ERROR } from './types'
import Api from '../api'

export const getRegionsBegin = () => {
  return {
    type: GET_REGIONS_BEGIN
  }
}

export const getRegionsFinish = regions => {
  return {
    type: GET_REGIONS_FINISH,
    payload: regions
  }
}

export const getRegionsError = error => {
  return {
    type: GET_REGIONS_ERROR,
    payload: error
  }
}

export function getRegions(countryId) {
  return function (dispatch) {
    dispatch(getRegionsBegin())
    return Api.instance()
      .getRegions(countryId)
      .then(regions => dispatch(getRegionsFinish(regions)))
      .catch(error => dispatch(getRegionsError(error)))
  }
}
import { GET_COUNTRIES_BEGIN, GET_COUNTRIES_FINISH, GET_COUNTRIES_ERROR } from './types'
import Api from '../api'

export const getCountriesBegin = () => {
  return {
    type: GET_COUNTRIES_BEGIN
  }
}

export const getCountriesFinish = countries => {
  return {
    type: GET_COUNTRIES_FINISH,
    payload: countries
  }
}

export const getCountriesError = error => {
  return {
    type: GET_COUNTRIES_ERROR,
    payload: error
  }
}

export function getCountries() {
  return function (dispatch) {
    dispatch(getCountriesBegin())
    return Api.instance()
      .getCountries()
      .then(countries => dispatch(getCountriesFinish(countries)))
      .catch(error => dispatch(getCountriesError(error)))
  }
}
import { GET_RANKING } from './types'
import Api from '../api'

export const getFavoriteRankingBegin = () => {
  return {
    type: GET_RANKING.FAVORITE.BEGIN
  }
}

export const getFavoriteRankingFinish = ranking => {
  return {
    type: GET_RANKING.FAVORITE.FINISH,
    payload: ranking
  }
}

export const getFavoriteRankingError = error => {
  return {
    type: GET_RANKING.FAVORITE.ERROR,
    payload: error
  }
}

export const getAllRankingBegin = () => {
  return {
    type: GET_RANKING.ALL.BEGIN
  }
}

export const getAllRankingFinish = ranking => {
  return {
    type: GET_RANKING.ALL.FINISH,
    payload: ranking
  }
}

export const getAllRankingError = error => {
  return {
    type: GET_RANKING.ALL.ERROR,
    payload: error
  }
}

export function getFavoriteRanking(tag) {
  return function (dispatch) {
    dispatch(getFavoriteRankingBegin())
    return Api.instance()
      .getFavoriteRanking(tag)
      .then(ranking => dispatch(getFavoriteRankingFinish(ranking)))
      .catch(error => dispatch(getFavoriteRankingError(error)))
  }
}

export function getAllRanking(tag) {
  return function (dispatch) {
    dispatch(getAllRankingBegin())
    return Api.instance()
      .getAllRanking(tag)
      .then(ranking => dispatch(getAllRankingFinish(ranking)))
      .catch(error => dispatch(getAllRankingError(error)))
  }
}
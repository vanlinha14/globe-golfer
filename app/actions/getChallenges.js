import { GET_CHALLENGES_BEGIN, GET_CHALLENGES_FINISH, GET_CHALLENGES_ERROR } from './types'
import Api from '../api'

export const getChallengesBegin = () => {
  return {
    type: GET_CHALLENGES_BEGIN
  }
}

export const getChallengesFinish = challenges => {
  return {
    type: GET_CHALLENGES_FINISH,
    payload: challenges
  }
}

export const getChallengesError = error => {
  return {
    type: GET_CHALLENGES_ERROR,
    payload: error
  }
}

export function getChallenges() {
  return function (dispatch) {
    dispatch(getChallengesBegin())
    return Api.instance()
      .getChallenges()
      .then(challenges => dispatch(getChallengesFinish(challenges)))
      .catch(error => dispatch(getChallengesError(error)))
  }
}
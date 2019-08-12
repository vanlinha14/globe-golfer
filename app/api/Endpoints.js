const BASE = "http://ec2-54-251-181-28.ap-southeast-1.compute.amazonaws.com:8080/golfer_api/api/"
export const LOGIN = BASE + "login"
export const GET_COUNTRY = BASE + "country"
export const GET_REGION = BASE + "region/{countryId}"
export const GET_CLUB = BASE + "club/{regionId}"

export const REGISTER = BASE + "user-add"

export const GET_FRIEND_LIST = BASE + "authenticated/friend/{userId}"
export const GET_CHALLENGES = BASE + "authenticated/challenge/list-info"
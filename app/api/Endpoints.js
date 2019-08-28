const BASE = "http://ec2-54-251-181-28.ap-southeast-1.compute.amazonaws.com:8080/golfer_api/api/"
export const LOGIN = BASE + "login"
export const GET_COUNTRY = BASE + "country"
export const GET_REGION = BASE + "region/{countryId}"
export const GET_CLUB = BASE + "club/{regionId}"

export const REGISTER = BASE + "user-add"

export const GET_FRIEND_LIST = BASE + "authenticated/friend/{userId}"
export const GET_CHALLENGES = BASE + "authenticated/challenge/list-info"
export const GET_PROFILE = BASE + "authenticated/profile"
export const GET_INTEREST = BASE + "authenticated/add-user-interest"

export const GET_NEW_NOTIFICATIONS = BASE + "authenticated/notification/list-new/{tag}?limit=0&item=2"
export const GET_HISTORY_NOTIFICATIONS = BASE + "authenticated/notification/list-history/{tag}?limit=0&item=2"
export const UPDATE_NOTIFICATION = BASE + "authenticated/notification/update/{id}"

export const CHALLENGE_SOME_ONE = BASE + "authenticated/add-challenge"
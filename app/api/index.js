import Base from './Base'
import { 
  DUMMY_COUNTRY, 
  DUMMY_REGION, 
  DUMMY_CLUB,
  DUMMY_AUTHENTICATION,
  DUMMY_CHALLENGE,
  DUMMY_PENDING_MATCHES,
  DUMMY_PLAYED_MATCHES,
  DUMMY_MESSAGES,
  DUMMY_NEW_NOTIFICATIONS,
  DUMMY_HISTORY_NOTIFICATIONS
} from './DummyData'
import { LOGIN } from './Endpoints';
import LoginBinder from './Binders/Login';

export default class Api extends Base {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new Api()
      }
      
      return this._instance
  }

  dummData(data) {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(data)
      }, 1000);
    })
  }

  getCountries() {
    return this.dummData(DUMMY_COUNTRY)
  }

  getRegions(countryId) {
    return this.dummData(DUMMY_REGION)
  }

  getClubs(regionId) {
    return this.dummData(DUMMY_CLUB)
  }

  register() {
    return this.dummData(DUMMY_AUTHENTICATION)
  }

  login(email, password) {
    const body = JSON.stringify({
      username : email,
	    password : password
    })
    return this.callPost(LOGIN, body, new LoginBinder())
  }

  loginGoogle(user) {
    return this.dummData(DUMMY_AUTHENTICATION)
  }

  loginFacebook(user) {
    return this.dummData(DUMMY_AUTHENTICATION)
  }

  getChallenges() {
    return this.dummData(DUMMY_CHALLENGE)
  }

  getPendingMatches() {
    return this.dummData(DUMMY_PENDING_MATCHES)
  }

  getPlayedMatches() {
    return this.dummData(DUMMY_PLAYED_MATCHES)
  }

  getMessages(tag) {
    return this.dummData(DUMMY_MESSAGES)
  }

  getNewNotifications(tag) {
    return this.dummData(DUMMY_NEW_NOTIFICATIONS)
  }

  getHistoryNotifications(tag) {
    return this.dummData(DUMMY_HISTORY_NOTIFICATIONS)
  }
}
import Base from './Base'
import { 
  DUMMY_COUNTRY, 
  DUMMY_REGION, 
  DUMMY_CLUB,
  DUMMY_AUTHENTICATION,
  DUMMY_CHALLENGE,
  DUMMY_PENDING_MATCHES,
  DUMMY_PLAYED_MATCHES
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

  getCountries() {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(DUMMY_COUNTRY)
      }, 1000);
    })
  }

  getRegions(countryId) {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(DUMMY_REGION)
      }, 1000);
    })
  }

  getClubs(regionId) {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(DUMMY_CLUB)
      }, 1000);
    })
  }

  register() {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(DUMMY_AUTHENTICATION)
      }, 2000);
    })
  }

  login(email, password) {
    const body = JSON.stringify({
      username : email,
	    password : password
    })
    return this.callPost(LOGIN, body, new LoginBinder())
  }

  loginGoogle(user) {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(DUMMY_AUTHENTICATION)
      }, 1000);
    })
  }

  loginFacebook(user) {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(DUMMY_AUTHENTICATION)
      }, 1000);
    })
  }

  getChallenges() {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(DUMMY_CHALLENGE)
      }, 1000);
    })
  }

  getPendingMatches() {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(DUMMY_PENDING_MATCHES)
      }, 1000);
    })
  }

  getPlayedMatches() {
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(DUMMY_PLAYED_MATCHES)
      }, 1000);
    })
  }
}
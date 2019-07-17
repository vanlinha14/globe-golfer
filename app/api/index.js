import Base from './Base'
import { 
  DUMMY_COUNTRY, 
  DUMMY_REGION, 
  DUMMY_CLUB,
  DUMMY_AUTHENTICATION
} from './DummyData'

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
    return new Promise((resolve, rejecter) => {
      setTimeout(() => {
        resolve(DUMMY_AUTHENTICATION)
      }, 1000);
    })
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
}
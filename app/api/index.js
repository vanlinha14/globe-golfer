import Base from './Base'
import { 
  DUMMY_COUNTRY, 
  DUMMY_REGION, 
  DUMMY_CLUB 
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
}
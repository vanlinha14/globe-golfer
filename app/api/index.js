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
  DUMMY_HISTORY_NOTIFICATIONS,
  DUMMY_FAVORITE_RANKING,
  DUMMY_ALL_RANKING
} from './DummyData'
import { LOGIN, GET_COUNTRY, GET_REGION, GET_CLUB, REGISTER } from './Endpoints';
import LoginBinder from './Binders/Login';
import CountriesBinder from './Binders/CountriesBinder';
import RegisterBinder from './Binders/RegisterBinder';
import RegistrationHelper from './RegistrationHelper';

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
    return this.callGet(GET_COUNTRY, new CountriesBinder())
  }

  getRegions(countryId) {
    const callingApi = GET_REGION.replace("{countryId}", `${countryId}`)
    return this.callGet(callingApi, new CountriesBinder())
  }

  getClubs(regionId) {
    const callingApi = GET_CLUB.replace("{regionId}", `${regionId}`)
    return this.callGet(callingApi, new CountriesBinder())
  }

  register() {
    const helper = RegistrationHelper.instance();
    const body = {
      email: helper.email,
      password: helper.password,
      first_name: helper.firstName,
      last_name: helper.lastName,
      date_of_born: helper.birthDay,
      sex: helper.gender,
      p_index: helper.index,
      golfCourseId: helper.club
    }

    var addition = {
      email: helper.email
    }

    if (helper.facebookId) {
      addition = {
        facebookId: helper.facebookId
      }
    } else if (helper.googleId) {
      addition = {
        googleId: helper.googleId
      }
    }

    const callingBody = {...body, ...addition}

    return new Promise((resolve, rejecter) => {
      this.callPost(REGISTER, JSON.stringify(callingBody), new RegisterBinder())
        .then(result => {
          if (result.result === true) {
            if (helper.email) {
              this.login(helper.email, helper.password)
                .then(data => resolve(data))
                .catch(e => rejecter(e))
            }
            else if (helper.facebookId) {
              this.loginFacebook(helper.facebookId, helper.facebookToken)
                .then(data => resolve(data))
                .catch(e => rejecter(e))
            }
          }
          else {
            rejecter()
          }
        })
        .catch(e => rejecter(e))
    })
  }

  login(email, password) {
    const body = JSON.stringify({
      username: email,
	    password: password
    })
    return this.callPost(LOGIN, body, new LoginBinder())
  }

  loginGoogle(user) {
    return this.dummData(DUMMY_AUTHENTICATION)
  }

  loginFacebook(id, token) {
    const body = JSON.stringify({
      facebookId: id,
	    facebookToken: '503331813804161'
    })
    return this.callPost(LOGIN, body, new LoginBinder())
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

  getFavoriteRanking(tag) {
    return this.dummData(DUMMY_FAVORITE_RANKING)
  }

  getAllRanking(tag) {
    return this.dummData(DUMMY_ALL_RANKING)
  }
}
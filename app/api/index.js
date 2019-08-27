import Base from './Base'
import { 
  DUMMY_AUTHENTICATION,
  DUMMY_PENDING_MATCHES,
  DUMMY_PLAYED_MATCHES,
  DUMMY_MESSAGES,
  DUMMY_NEW_NOTIFICATIONS,
  DUMMY_HISTORY_NOTIFICATIONS,
  DUMMY_FAVORITE_RANKING,
  DUMMY_ALL_RANKING
} from './DummyData'
import { LOGIN, GET_COUNTRY, GET_REGION, GET_CLUB, REGISTER, GET_CHALLENGES, GET_PROFILE, GET_INTEREST, GET_NEW_NOTIFICATIONS, GET_HISTORY_NOTIFICATIONS, CHALLENGE_SOME_ONE } from './Endpoints';
import LoginBinder from './Binders/Login';
import CountriesBinder from './Binders/CountriesBinder';
import RegisterBinder from './Binders/RegisterBinder';
import RegistrationHelper from './RegistrationHelper';
import ChallengesBinder from './Binders/ChallengesBinder';
import ProfileBinder from './Binders/ProfileBinder';
import InterestBinder from './Binders/InterestBinder';
import NotificationBinder from './Binders/NotificationBinder';

export default class Api extends Base {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new Api()
      }
      
      return this._instance
  }

  currentUserProfile = undefined;

  setCurrentUserProfile(profile) {
    this.currentUserProfile = profile;
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
	    facebookToken: token
    })
    return this.callPost(LOGIN, body, new LoginBinder())
  }

  getChallenges() {
    return this.callGet(GET_CHALLENGES, new ChallengesBinder())
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
    const callingApi = GET_NEW_NOTIFICATIONS.replace("{tag}", tag + 1);
    console.warn(callingApi);
    
    return this.callGet(callingApi, new NotificationBinder())
  }

  getHistoryNotifications(tag) {
    const callingApi = GET_HISTORY_NOTIFICATIONS.replace("{tag}", tag + 1);
    return this.callGet(callingApi, new NotificationBinder())
  }

  getFavoriteRanking(tag) {
    return this.dummData(DUMMY_FAVORITE_RANKING)
  }

  getAllRanking(tag) {
    return this.dummData(DUMMY_ALL_RANKING)
  }

  getProfile() {
    return this.callGet(GET_PROFILE, new ProfileBinder());
  }

  updateProfile(objToUpdate) {
    return new Promise((resolve, rejecter) => {
      this.callPut(GET_PROFILE, JSON.stringify(objToUpdate)).then(_ => {
        this.getProfile().then(resolve).catch(rejecter)
      })
      .catch(rejecter)
    })
  }

  getInterest() {
    return this.callGet(GET_INTEREST, new InterestBinder());
  }

  challengeTo(userId) {
    const body = JSON.stringify({
      user_from: this.currentUserProfile.id,
      user_to: userId,
      status: 0
    })

    return this.callPost(CHALLENGE_SOME_ONE, body);
  }
}

export default class RegistrationHelper {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new RegistrationHelper()
      }
      
      return this._instance
  }

  email = undefined
  password = undefined

  facebookId = undefined
  facebookToken = undefined

  googleId = undefined
  googleToken = undefined

  card = undefined

  firstName = undefined
  lastName = undefined
  index = undefined
  license = undefined
  birthDay = undefined
  gender = undefined
  country = undefined
  region = undefined
  club = undefined

  avatar = undefined

  setEmail(email) {
    this.email = email
    
    this.facebookId = undefined
    this.googleId = undefined
  }

  setPassword(password) {
    this.password = password
  }

  setFacebookId(id) {
    this.facebookId = id

    this.email = undefined
    this.googleId = undefined
  }

  setFacebookToken(token) {
    this.facebookToken = token
  }

  setGoogleId(id) {
    this.googleId = id

    this.email = undefined
    this.facebookId = undefined
  }

  setGoogleToken(token) {
    this.googleToken = token
  }

  setMembershipCard(card) {
    this.card = card
  }

  setFirstName(firstName)  {
    this.firstName = firstName
  }

  setLastName(lastName) {
    this.lastName = lastName
  }

  setIndex(index) {
    this.index = index
  }

  setLicense(license) {
    this.license = license
  }

  setBirthDay(birthday) {
    this.birthDay = birthday
  }

  setGender(gender) {
    this.gender = gender
  }

  setCountry(country) {
    this.country = country
  }

  setRegion(region) {
    this.region = region
  }

  setClub(club) {
    this.club = club
  }

  setAvatar(avatar) {
    this.avatar = avatar
  }
}
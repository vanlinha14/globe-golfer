
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
  card = undefined
  country = undefined
  region = undefined
  club = undefined
  avatar = undefined

  setEmail(email) {
    this.email = email
  }

  setPassword(password) {
    this.password = password
  }

  setMembershipCard(card) {
    this.card = card
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
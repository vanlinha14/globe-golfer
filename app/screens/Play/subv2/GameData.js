export default class GameData {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new GameData()
      }
      
      return this._instance
  } 

  playerA = {
    avatar: "https://ideapod.com/wp-content/uploads/2017/06/stencil.facebook-post-20.jpg",
    name: "Alexandre M"
  }
  
  playerB = {
    avatar: "https://www.midlandsderm.com/wp-content/uploads/2019/04/Rachel-R.-Person.jpg",
    name: "Frencois B"
  }

  gameType = null
}
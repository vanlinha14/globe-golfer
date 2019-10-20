import Api from "../api"

export default class AdsRepository {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new AdsRepository()
      }
      
      return this._instance
  }

  ads = null
  subscriber = []

  loadAds() {
    Api.instance().getAds().then(res => {
      this.ads = res
      this.onAdsComming()
    })
  }

  onAdsComming() {
    this.subscriber.forEach(s => s(this.ads))
  }

  subscribe(target) {
    this.subscriber.push(target)
    target(this.ads)
  }

  unSubscribe(target) {
    const targetIndex = this.subscriber.indexOf(target)

    if (targetIndex >= 0) {
      this.subscriber.splice(targetIndex, 1)
    }
  }
}

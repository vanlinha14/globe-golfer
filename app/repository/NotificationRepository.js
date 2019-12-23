export default class NotificationRepository {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new NotificationRepository()
      }
      
      return this._instance
  }

  notifications = []
  subscriptions = []

  addSubscription(s) {
    if (this.subscriptions.indexOf(s) >= 0) {
      return
    }

    this.subscriptions.push(s)

    s(this.notifications.length)
  }

  removeSubscription(s) {
    const index = this.subscriptions.indexOf(s)

    if (index < 0) {
      return
    }

    this.subscriptions.splice(index, 1)
  }

  updateNotifications(n) {
    if (!Array.isArray(n)) {
      return
    }

    this.notifications = n

    this.subscriptions.forEach(s => s(n.length))
  }

}
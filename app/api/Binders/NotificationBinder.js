export default class NotificationBinder {
  bind(input) {
    try {
      const data = input.data
      return data.map(i => {
        return {
          id: i.id,
          title: i.name
        }
      })
    }
    catch(e) {
      return {
        result: false
      }
    }
  }
}
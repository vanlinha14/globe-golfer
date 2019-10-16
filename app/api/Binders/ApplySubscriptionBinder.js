export default class ApplySubscriptionBinder {
  bind(input) {
    try {
      const result = input.result
      return result
    }
    catch {
      return false
    }
  }
}
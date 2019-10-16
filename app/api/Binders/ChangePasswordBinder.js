export default class ChangePasswordBinder {
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
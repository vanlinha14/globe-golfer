export default class RegisterBinder {
  bind(input) {
    try {
      const result = input.result
      return {
        result: result === true
      }
    }
    catch {
      return {
        result: false
      }
    }
  }
}
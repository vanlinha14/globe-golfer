export default class LoginBinder {
  bind(input) {
    try {
      const result = input.result
      const accessToken = input.data.token
      if (result === true) {
        return { 
          result,
          accessToken
        }
      }
      else {
        return { 
          result: false
        }
      }
    }
    catch {
      return {
        result: false
      }
    }
  }
}
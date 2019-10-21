export default class OneMessageBinder {
  bind(input) {
    try {
      const data = input.data 
      return {
        first: {
          id: data.code_user_first
        },
        second: {
          id: data.code_user_seconds
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
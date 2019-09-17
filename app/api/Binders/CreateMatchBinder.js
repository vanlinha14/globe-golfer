export default class CreateMatchBinder {
  bind(input) {
    try {
      return {
        matchId: input.data.scheduleId
      }
    }
    catch(e) {
      return {
        result: false
      }
    }
  }
}
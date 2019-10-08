export default class MatchResultBinder {
  bind(input) {
    try {
      const data = input.data 
      return data.map(i => {
        return {
          holeNumber: i.hole_number,
          par: i.par_number,
          score1: i.score_user_first,
          score2: i.score_user_second,
          up1: i.up_user_first,
          up2: i.up_user_second
        }
      })
    }
    catch {
      return {
        result: false
      }
    }
  }
}
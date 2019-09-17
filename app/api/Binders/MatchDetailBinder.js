export default class MatchDetailBinder {
  bind(input) {
    try {
      const data = input.data

      const start = data.hole_star
      const count = data.hole_number

      const list = data.list.map(i => {
        return  {
          id: i.id,
          hole: i.hole,
          par: i.par_hole
        }
      })

      return {
        start,
        count,
        data: list
      }
    }
    catch(e) {
      return {
        result: false
      }
    }
  }
}
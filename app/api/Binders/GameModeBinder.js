export default class GameModeBinder {
  bind(input) {
    try {
      const data = input.data
      return data.map(i => {
        return {
          id: i.id,
          content: i.detail,
          holeStart: i.hole_start,
          holeCount: i.number_hole
        };
      })
    }
    catch(e) {
      return {
        result: false
      }
    }
  }
}
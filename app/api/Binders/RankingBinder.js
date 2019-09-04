export default class RankingBinder {
  bind(input) {
    try {
      const data = input.data
      return data.map((i, index) => {
        return {
          index: index + 1,
          id: i.id_user,
          name: i.name,
          total: i.score
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

// index: 1,
//     name: "OLIVER, Sam",
//     total: -12
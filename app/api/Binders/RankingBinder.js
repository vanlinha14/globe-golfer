export default class RankingBinder {
  bind(input) {
    try {
      const data = input.data
      return data.map((i, index) => {
        return {
          index: index + 1,
          id: i.id_user,
          name: i.clubName ? i.clubName : i.name,
          total: i.scoreSum ? i.scoreSum : i.score
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
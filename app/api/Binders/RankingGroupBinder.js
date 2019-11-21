export default class RankingGroupBinder {
  bind(input) {
    try {
      const data = input.data
      const returnValue = {
        id: data.clubId,
        name: data.clubName,
        data: data.rankinglist.map((d, i) => {
          return {
            index: i + 1,
            id: d.id,
            name: d.name,
            total: d.score
          }
        })
      }

      return returnValue
    }
    catch(e) {
      alert(JSON.stringify(e))
      return {
        result: false
      }
    }
  }
}

// index: 1,
//     name: "OLIVER, Sam",
//     total: -12
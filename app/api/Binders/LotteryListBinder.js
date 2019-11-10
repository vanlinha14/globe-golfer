import { LOTTERY_IMAGE } from "../Endpoints"

export default class LotteryListBinder {
  bind(input) {
    try {
      const result = input.result
      const data = input.data

      if (result && Array.isArray(data) && data.length > 0) {
        return data.map(d => {
          return {
            name: d.nameAward,
            about: d.about,
            image: d.image ? LOTTERY_IMAGE.replace("{id}", d.image) : null,
            prize: d.namePrize,
            id: d.prizeId
          }
        })
      }
      else {
        return []
      }
    }
    catch {
      return []
    }
  }
}
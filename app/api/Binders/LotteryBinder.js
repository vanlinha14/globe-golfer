export default class LotteryBinder {
  bind(input) {
    try {
      const result = input.result
      const data = input.data

      if (result && Array.isArray(data) && data.length > 0) {
        const d = data[0]
        return {
          id: d.lotteryId,
          start: d.startDate,
          end: d.closeDate
        }
      }
      else {
        return null
      }
    }
    catch {
      return {
        result: false
      }
    }
  }
}